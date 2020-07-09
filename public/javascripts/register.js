/**
 * @param  {string} inputId - input id
 * @param  {(string)=>boolean} validation - validate function that returns true if valid.
 * @param  {(boolean)=>string} label - a function returns label text
 * @param {boolean} isAsync - true if validation function is async
 */

// Applying validations to input
(function () {
  function applyValidation(inputId, validation, label, isAsync) {
    const inputDom = document.getElementById(inputId);
    const labelDom = document.getElementById(inputId + "_label");
    inputDom.addEventListener("focusout", (e) => {
      if (!isAsync) {
        const valid = validation(e.target.value);
        labelDom.innerText = label(valid);
        if (valid) {
          inputDom.classList.remove("input_alert");
          labelDom.classList.remove("alert_label");
        } else {
          inputDom.classList.add("input_alert");
          labelDom.classList.add("alert_label");
        }
      } else {
        validation(e.target.value)
          .then((valid) => {
            // codes only for id duplication check
            labelDom.innerText = label(valid);
            if (valid) {
              inputDom.classList.remove("input_alert");
              labelDom.classList.remove("alert_label");
            } else {
              inputDom.classList.add("input_alert");
              labelDom.classList.add("alert_label");
            }
          })
          .catch((e) => {
            throw e;
          });
      }
    });
  }

  applyValidation(
    "input_id",
    (id) => {
      if (!validateId(id)) return Promise.resolve(false);
      else {
        return fetch("/api/id_duplication_check?id=" + id)
          .then((res) => res.json())
          .then((res) => (res.result === "ok" ? 1 : 0));
      }
    },
    (valid) => {
      if (valid === false)
        return "아이디는 4~20자의 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능합니다.";
      else if (valid === 0)
        // TODO refactor... duplicated id.
        return "중복된 아이디입니다.";
      else return "입력하신 아이디로 사용이 가능합니다.";
    },
    true
  );

  applyValidation("input_password", validatePassword, (valid) =>
    valid
      ? "사용 가능한 비밀번호입니다."
      : "비밀번호는 영문과 숫자 포함해서 8~20자로 입력해주세요."
  );

  applyValidation(
    "input_password_check",
    (checkString) => {
      const passwordInput = document.getElementById("input_password");
      return passwordInput.value === checkString;
    },
    (valid) =>
      valid ? "" : "위 비밀번호와 일치하지 않습니다. 다시 입력해주세요."
  );

  //Email vaildaion
  function applyEmailValidation() {
    const usernameInput = document.getElementById("input_email_username");
    const providerInput = document.getElementById("input_email_provider");
    const label = document.getElementById("input_email_label");

    function check() {
      let valid = true;
      if (validateEmailPrivider(providerInput.value)) {
        providerInput.classList.remove("input_alert");
      } else {
        valid = false;
        providerInput.classList.add("input_alert");
      }

      if (validateEmailUsername(usernameInput.value)) {
        usernameInput.classList.remove("input_alert");
      } else {
        valid = false;
        usernameInput.classList.add("input_alert");
      }

      if (valid) {
        label.innerText = "";
        label.classList.remove("alert_label");
      } else {
        if (providerInput.value === "" || usernameInput.value === "")
          label.innerText = "이메일을 입력해 주세요.";
        else label.innerText = "유효하지 않은 이메일입니다.";
        label.classList.add("alert_label");
      }
    }

    providerInput.addEventListener("focusout", check);
    usernameInput.addEventListener("focusout", check);
  }
  applyEmailValidation();

  const select = document.getElementById("select_email_provider");
  select.addEventListener("change", (e) => {
    const provider = e.target.value;
    const providerInput = document.getElementById("input_email_provider");
    providerInput.classList.remove("input_alert");
    if (provider === "") {
      providerInput.readOnly = false;
    } else {
      providerInput.value = provider;
      providerInput.readOnly = true;
    }
  });

  applyValidation("input_name", validateName, (valid) =>
    valid ? "" : "이름에 특수문자 또는 숫자를 포함할 수 없습니다."
  );

  applyValidation("input_phone", validatePhoneNumber, (valid) =>
    valid ? "" : "유효하지 않은 번호입니다."
  );
})();

// Applying phone authentication
(function () {
  const phoneNumberInput = document.getElementById("input_phone");
  const phoneNumberButton = document.getElementById("button_phone_auth");
  const phoneAuthDiv = document.getElementById("div_phone_auth");
  const phoneAuthNumberDiv = document.getElementById("div_input_phone_auth");
  const phoneAuthNumberInput = document.getElementById("input_phone_auth");
  const phoneAuthRemainingLabel = document.getElementById(
    "label_phone_auth_remain_time"
  );
  const phoneLabel = document.getElementById("label_phone_auth");
  let stopPhoneAuth = null;
  function startPhoneAuth() {
    if (stopPhoneAuth) stopPhoneAuth();
    phoneNumberInput.readOnly = true;
    phoneAuthDiv.style.display = "inherit";

    const timer = function (second, beforeEachCallback, finishCallback) {
      if (second === 0) {
        finishCallback();
        return () => {};
      }
      beforeEachCallback(second);

      let nextSecond = second - 1;

      const timerId = setTimeout(() => {
        stopPhoneAuth = timer(nextSecond, beforeEachCallback, finishCallback);
      }, 1000);
      const interupt = () => {
        clearTimeout(timerId);
      };
      return interupt;
    };

    stopPhoneAuth = timer(
      10,
      (second) => {
        const remainTimeString = [~~(second / 60), second % 60]
          .map((x) => (x >= 10 ? x : "0" + x))
          .join(":");
        phoneAuthRemainingLabel.innerText = remainTimeString;
      },
      () => {
        endPhoneAuth();
        phoneAuthDiv.style.display = "none";
        rejectPhoneAuth("입력시간을 초과했습니다.");
      }
    );
  }

  /**
   * reset phone auth number elements. not set display none
   */
  function endPhoneAuth() {
    phoneAuthRemainingLabel.innerText = "";
    phoneAuthNumberInput.value = "";
    phoneLabel.classList.remove("alert_label");
    phoneLabel.innerText = "";
    phoneAuthNumberDiv.classList.remove("input_alert");
  }

  function confirmPhoneAuth() {
    endPhoneAuth();
    phoneAuthDiv.style.display = "none";
    phoneNumberButton.classList.remove("input_button");
    phoneNumberButton.disabled = true;
    phoneNumberButton.innerText = "인증 완료";
  }

  function rejectPhoneAuth(reason) {
    phoneLabel.classList.add("alert_label");
    phoneLabel.innerText = reason;
    phoneAuthNumberDiv.classList.add("input_alert");
  }

  phoneNumberButton.addEventListener("click", (e) => {
    endPhoneAuth();
    // const phoneLabel = document.getElementById("input_phone_label");
    if (validatePhoneNumber(phoneNumberInput.value)) {
      startPhoneAuth();
    } else {
      phoneNumberInput.classList.add("input_alert");
      phoneLabel.classList.add("alert_label");
      phoneLabel.innerText = "유효하지 않은 번호입니다.";
    }
  });

  document
    .getElementById("button_phone_auth_confirm")
    .addEventListener("click", () => {
      const authNumber = phoneAuthNumberInput.value;
      fetch("/api/phone_auth?auth_number=" + authNumber)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          if (res.result === "ok") {
            confirmPhoneAuth();
          } else {
            rejectPhoneAuth("인증번호를 확인해 주세요.");
          }
        });
    });
})();

/**
 * 전체 약관 동의 체크 함수
 */
function allowAllCheck(checkbox) {
  let all = document.getElementById("allowAll");
  let essential = document.getElementById("agreeEssential");
  let advertisement = document.getElementById("agreeAdvertisement");
  if (all.checked) {
    essential.checked = true;
    advertisement.checked = true;
  } else {
    essential.checked = false;
    advertisement.checked = false;
  }
}

function checkEssential(checkbox) {
  let all = document.getElementById("allowAll");
  let essential = document.getElementById("agreeEssential");
  let advertisement = document.getElementById("agreeAdvertisement");
  if (!essential.checked || !advertisement.checked) {
    all.checked = false;
  } else {
    all.checked = true;
  }
}

function checkAdvertisement(checkbox) {
  let all = document.getElementById("allowAll");
  let essential = document.getElementById("agreeEssential");
  let advertisement = document.getElementById("agreeAdvertisement");
  if (!essential.checked || !advertisement.checked) {
    all.checked = false;
  } else {
    all.checked = true;
  }
}

function activeAddressButton(checkbox) {
  let optional = document.getElementById("optionalInfoCheck");
  let addressButton = document.getElementById("findAddressButton");
  let postNumber = document.getElementById("postNumber");
  let address = document.getElementById("address");
  let detail = document.getElementById("detail");

  if (optional.checked) {
    addressButton.disabled = false;
    addressButton.classList.add("input_button");
    postNumber.disabled = false;
    address.disabled = false;
    detail.disabled = false;
  } else {
    addressButton.disabled = true;
    addressButton.classList.remove("input_button");
    postNumber.disabled = true;
    address.disabled = true;
    detail.disabled = true;
  }
}

function onAddressModal() {
  document.getElementById("overlay").style.display = "block";

  let addressSearch = document.getElementById("addressSearchInput");
  addressSearch.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchAddress();
    }
  });

  let registerForm = document.getElementById("register_form");
  registerForm.onkeypress = function (e) {
    let key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
    }
  };
}

function offAddressModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("addressSearchInput").value = "";
}

function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * 주소 검색 api랑 연동하면 될듯
 */
function searchAddress() {
  let address = document.getElementById("addressSearchInput").value;
  console.log("주소를 검색하고 있는가", address);
}
