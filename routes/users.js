var express = require("express");
var usersDB = require("../models/userModel.js");
var validations = require("../public/javascripts/validations");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  let user = req.body;

  // validation 실패 시

  // validation 성공 시 db에 저장
  console.log("id체크 :", validations.validateName(user.name));

  //res.redirect("/register");

  // db에 존재하는지 확인 후 저장
  usersDB.findOne({ id: user.id }, function (err, doc) {
    if (!doc) {
      usersDB.insert(user);
    }
  });

  res.render("complete_register", { user });
});

/* GET compelete register page. */
router.get("/phone_auth", function (req, res, next) {
  const number = req.query.auth_number;
  if (number.length === 6) {
    res.status(200);
    res.json({ result: "ok" });
  } else {
    res.status(200);
    res.json({ result: "error" });
  }
});

module.exports = router;
