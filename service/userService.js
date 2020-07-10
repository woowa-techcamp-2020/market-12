var usersDB = require("../models/userModel");
var validations = require("../service/validations");
var bcrypt = require("bcrypt");

function validationCheck(user) {
  var checkId = validations.validateId(user.id);
  var checkName = validations.validateName(user.name);
  var checkPassword = validations.validatePassword(user.password);
  var checkEmailName = validations.validateEmailUsername(user.email_username);
  var checkEmailProvider = validations.validateEmailProvider(
    user.email_provider
  );
  var checkPhone = validations.validatePhoneNumber(user.phone);

  var checkList = [];
  if (!checkPhone) checkList.push("phone");
  if (!checkName) checkList.push("name");
  if (!checkEmailName) checkList.push("email_username");
  if (!checkEmailProvider) checkList.push("email_provider");
  if (!checkPassword) checkList.push("password");
  if (!checkId) checkList.push("id");
  return checkList;
}

async function isExist(userId) {
  var res = await new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id: userId }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
  if (res) return true;
  else return false;
}

async function SignUp(user) {
  let tempUser = null;

  //검색
  tempUser = await new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });

  //있으면
  if (tempUser) {
    return { result: "exist" };
  } else {
    user.password = await bcrypt.hash(user.password, 10);
    usersDB.usersDB.insert(user);
    tempUser = await new Promise((resolve, reject) => {
      usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
    return { user: tempUser, result: "none" };
  }
}

function SignIn(id, password) {
  return new Promise(async (resolve, reject) => {
    usersDB.usersDB.findOne({ id }, (err, doc) => {
      if (err) reject(err);
      else if (!doc) resolve(null);
      else {
        bcrypt.compare(password, doc.password, (err, valid) => {
          if (err) reject(err);
          else resolve(valid ? doc : null);
        });
      }
    });
  });
}

module.exports = { SignUp, SignIn, isExist, validationCheck };
