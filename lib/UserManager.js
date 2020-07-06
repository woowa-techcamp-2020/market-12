import Nedb from "nedb";

const userDb = new Nedb({ filename: "user.nedb" });
class User {
  id;
  password;
  email;
  name;
  phone;
  address;
  agreeEssential;
  agreeAdvertisement;
  // address = {
  //  postNumber;
  //  address;
  //  detail;
  //}
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

  checkPassword(password) {
    return password === this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

class UserManager {
  db = null;
  constructor(filename) {
    this.db = new Nedb({ filename: "user.nedb" });
  }

  saveUser({
    id,
    email,
    name,
    phone,
    address,
    agreeEssential,
    agreeAdvertisement,
  }) {}

  findUser(id) {}
}
