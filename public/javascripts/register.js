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

//TODO: email

applyValidation("input_name", validateName, (valid) =>
  valid ? "" : "이름에 특수문자 또는 숫자를 포함할 수 없습니다."
);

applyValidation("input_phone", validatePhoneNumber, (valid) =>
  valid ? "" : "유효하지 않은 번호입니다."
);
