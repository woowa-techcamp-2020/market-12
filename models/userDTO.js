class UserDTO {
  id;
  password;
  email;
  name;
  phone;
  address;
  agreeEssential;
  agreeAdvertisement;
  /**
   * @param  {object} userInfo
   * @param  {string} userInfo.id
   * @param  {string} userInfo.email
   * @param  {string} userInfo.name
   * @param  {string} userInfo.phone
   * @param  {object} userInfo.address
   * @param  {string} userInfo.address.postNumber - 우편번호
   * @param  {string} userInfo.address.address - 주소
   * @param  {string} userInfo.address.detail - 상세주소
   * @param  {boolean} userInfo.agreeEssential
   * @param  {boolean} userInfo.agreeAdvertisement
   */
  constructor({
    id,
    email,
    name,
    phone,
    address,
    agreeEssential,
    agreeAdvertisement,
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.agreeAdvertisement = agreeAdvertisement;
    this.agreeEssential = agreeEssential;
  }

  /**
   * @param  {string} password
   * @returns {boolean}
   */
  checkPassword(password) {
    return password === this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

module.exports = { UserDTO };
