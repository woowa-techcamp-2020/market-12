var usersDB = require("../models/userModel");
//var usersDB = require("../models/userModel.js");

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
  const userRecord = "";
  return { userRecord };
}

module.exports = { SignUp, SignIn };
