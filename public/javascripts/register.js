/**
 * @param  {string} inputId - input id
 * @param  {(string)=>boolean} validation - validate function that returns true if valid.
 * @param  {(boolean)=>string} label - a function returns label text
 */
function applyValidation(inputId, validation, label) {
  const inputDom = document.getElementById(inputId);
  const labelDom = document.getElementById(inputId + "_label");
  inputDom.addEventListener("focusout", (e) => {
    labelDom.innerText = label(validation(e.target.value));
  });
}

applyValidation("input_id", validateId, (valid) =>
  valid
    ? "입력하신 아이디로 사용이 가능합니다."
    : "아이디는 4~20자의 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능합니다. "
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

  providerInput.addEventListener("focusout", (e) => {
    if (e.target.value === "") label.innerText = "이메일을 입력해 주세요.";
    else if (!validateEmailPrivider(e.target.value)) {
      //input에 클래스 추가
      label.innerText = "유효하지 않은 이메일입니다.";
    }
  });

  usernameInput.addEventListener("focusout", (e) => {
    if (e.target.value === "") label.innerText = "이메일을 입력해 주세요.";
    else if (!validateEmailUsername(e.target.value)) {
      //input에 클래스 추가
      label.innerText = "유효하지 않은 이메일입니다.";
    }
  });
}

applyEmailValidation();

const select = document.getElementById("select_email_provider");
select.addEventListener("change", (e) => {
  const provider = e.target.value;
  const providerInput = document.getElementById("input_email_provider");
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

function startPhoneAuth() {
  const RemainTime = {
    minuite: 2,
    second: 1,
    subtractASecond: function () {
      this.second--;
      if (this.second < 0) {
        if (this.minuite === 0) return null;
        this.minuite--;
        this.second = 59;
      }
      return (
        ("0" + this.minuite).slice(-2) + ":" + ("0" + this.second).slice(-2)
      );
    },
  };

  let intervalId = setInterval(() => {
    const remainTime = RemainTime.subtractASecond();
    if (!remainTime) {
      clearInterval(intervalId);
      endPhoneAuth();
      intervalId = null;
    } else {
      document.getElementById(
        "label_phone_auth_remain_time"
      ).innerText = remainTime;
    }
  }, 1000);
  const label = document.getElementById("label_phone_auth_remain_time");

  return intervalId;
}

//TODO
function endPhoneAuth() {}

let phoneAuthIntervalId = null;
document.getElementById("button_phone_auth").addEventListener("click", (e) => {
  clearInterval(phoneAuthIntervalId);
  if (validatePassword(document.getElementById("input_phone").value)) {
    phoneAuthIntervalId = startPhoneAuth();
  } else {
    document.getElementById("input_phone_label").innerText =
      "유효하지 않은 번호입니다.";
  }
});

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

function optionalInfoCheck(checkbox) {
  let optional = document.getElementById("optionalInfoCheck");
  let addressButton = document.getElementById("findAddressButton");

  if (optional.checked) {
  }
}
