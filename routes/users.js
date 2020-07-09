var express = require("express");
var userService = require("../service/userService.js");
var validations = require("../public/javascripts/validations");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  let user = req.body;

  // TODO: 여기 작업 다시 하자
  //res = userService.SignUp(user);

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

  // db에 존재하는지 확인 후 저장
  usersDB.findOne({ id: user.id }, function (err, doc) {
    if (!doc) {
      usersDB.insert(user);
    }
  });

  
  */
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

/* GET check whether user with id exists */
/**
 * @query {string} id
 */
// TODO real check
router.get("/id_duplication_check", function (req, res, next) {
  console.log(req.query);
  if (req.query.id.length > 6) res.json({ result: "ok" });
  else res.json({ result: "no" });
});

module.exports = router;
