var express = require("express");
var userService = require("../service/userService.js");
var validations = require("../public/javascripts/validations");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res) {
  var user = req.body;
  // 회원가입부분
  var result = await userService.SignUp(user);

  user = result.res;
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

/*
  // validation 실패 시
  console.log(user);
  console.log("id=", validations.validateId(user.id));
  console.log("name=", validations.validateName(user.name));
  console.log("password=", validations.validatePassword(user.password));
  console.log("phone=", validations.validatePhoneNumber(user.phone));
  console.log(
    "email_name=",
    validations.validateEmailUsername(user.email_username)
  );
  console.log(
    "email_pro=",
    validations.validateEmailPrivider(user.email_provider)
  );
  // validation 성공 시 db에 저장

  */
