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
function validatePassword(password) {}
/**
 * @param  {string} username
 * @param  {string} provider
 * @returns {boolean}
 */
function validateEmail(username, provider) {}
/**
 * @param  {string} name
 * @returns {boolean}
 */
function validateName(name) {}
/**
 * @param  {string} phoneNumber
 * @returns {boolean}
 */
function validatePhoneNumber(phoneNumber) {}
