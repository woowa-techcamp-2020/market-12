var usersDB = require("../models/userModel");
var validations = require("../service/validations");

function validationCheck(user) {
  var checkId = validations.validateId(user.id);
  var checkName = validations.validateId(user.name);
  var checkPassword = validations.validateId(user.password);
  var checkEmailName = validations.validateId(user.email_username);
  var checkEmailProvider = validations.validateId(user.email_provider);
  var checkPhone = validations.validateId(user.phone);

  var checkList = [];
  if (!checkId) checkList.push("id");
  if (!checkName) checkList.push("name");
  if (!checkPassword) checkList.push("password");
  if (!checkEmailName) checkList.push("email_username");
  if (!checkEmailProvider) checkList.push("email_provider");
  if (!checkPhone) checkList.push("phone");
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
  var res;
  //validation check
  var checkList = validationCheck(user);

  //검색
  res = await new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });

  //있으면
  if (res) {
    res = "이미 존재하는 유저입니다";
  }
  //없으면
  else {
    usersDB.usersDB.insert(user);
    res = await new Promise((resolve, reject) => {
      usersDB.usersDB.findOne({ id: user.id }, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }
  return { res };
}

function SignIn(id, password) {
  return new Promise((resolve, reject) => {
    usersDB.usersDB.findOne({ id, password }, (err, doc) => {
      if (err) reject(err);
      if (!doc) resolve(null);
      else {
        //const user = new UserDTO(doc, doc.password);
        resolve(doc);
      }
    });
  });
}

module.exports = { SignUp, SignIn, isExist, validationCheck };
