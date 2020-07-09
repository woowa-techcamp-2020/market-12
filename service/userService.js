var usersDB = require("../models/userModel");
const { UserDTO } = require("../models/userDTO");
//var usersDB = require("../models/userModel.js");
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
    usersDB.usersDB.findOne({ id }, (err, doc) => {
      if (err) reject(err);
      if (!doc) resolve(null);
      else {
        const user = new UserDTO(doc, doc.password);
        resolve(user);
      }
    });
  });
}

module.exports = { SignUp, SignIn, isExist };
