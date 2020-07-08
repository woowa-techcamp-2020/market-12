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
 * @returns {boolean}
 */
function validateEmailUsername(username) {
  // https://en.wikipedia.org/wiki/Email_address
  return /^(?:[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)(?:\.[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)*$/.test(
    username
  );
}

/**
 * @param  {string} provider
 * @returns {boolean}
 */
function validateEmailPrivider(provider) {
  // top level domain은 그냥 영문자만 가능하도록.
  return /^(?:[a-zA-Z0-9][a-zA-Z0-9\-]*\.)+(?:[a-zA-Z]+)$/.test(provider);
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
