/**
 * @param  {string} id
 * @returns {boolean}
 */
function validateId(id) {
  return /^[a-z0-9_-]{4,20}$/.test(id);
}
/**
 * @param  {string} password
 * @returns {boolean}
 */
//숫자 필수
function validatePassword(password) {
  return /^[a-z0-9]{8,20}$/.test(password);
}
/**
 * @param  {string} username
 * @param  {string} provider
 * @returns {boolean}
 */
function validateEmail(username, provider) {
  //https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression 참고함
  return (
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")$/.test(
      username
    ) &&
    /^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      provider
    )
  );
}
/**
 * @param  {string} name
 * @returns {boolean}
 */
function validateName(name) {
  return /^[a-zA-Z가-힣\s]+$/.test(name);
}
/**
 * @param  {string} phoneNumber
 * @returns {boolean}
 */
function validatePhoneNumber(phoneNumber) {
  return /^01[01679]\d{7,8}$/.test(phoneNumber);
}
