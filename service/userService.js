var usersDB = require("../models/userModel");
var validations = require("../service/validations");

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
  if (!user.agree_essential) checkList.push("agree_essential");
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
  var result;
  var tempUser;
  //검색
  tempUser = await new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });

  //있으면
  if (tempUser) {
    result = "exist";
  }
  //없으면
  else {
    result = "none";
    usersDB.usersDB.insert(user);
    tempUser = await new Promise((resolve, reject) => {
      usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }
  return { tempUser, result };
}

function SignIn(id, password) {
  return new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id, password }, (err, doc) => {
      if (err) reject(err);
      if (!doc) resolve(null);
      else {
        resolve(doc);
      }
    });
  });
}

module.exports = { SignUp, SignIn, isExist, validationCheck };
