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
  console.log("print user", user);
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

/* GET check whether user with id exists */
/**
 * @query {string} id
 */
// TODO real check
router.get("/id_duplication_check", async function (req, res, next) {
  var userId = req.query.id;
  var isExist = await userService.isExist(userId);
  if (isExist) res.json({ result: "no" });
  else res.json({ result: "ok" });
});

module.exports = router;
