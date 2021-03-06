var express = require("express");
var userService = require("../service/userService.js");
const { SignIn } = require("../service/userService.js");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res) {
  const { id, password } = req.body;
  const user = await SignIn(id, password);
  if (user) {
    res.session.setSession({ user });
    res.json({ result: "ok" });
  } else {
    res.json({ result: "no" });
  }
});

router.post("/register", async function (req, res) {
  var user = req.body;

  //validation 체크
  var checkList = userService.validationCheck(user);

  if (checkList.length > 0) {
    res.status(200);
    res.json({ result: "checkFail", checkList });
    return;
  }

  // 회원가입부분
  var result = await userService.SignUp(user);
  if (result.result == "exist") {
    res.json({ result: "alreadyExist" });
  } else {
    // 유저 정보 세션 저장
    user = result.user;
    res.session.setSession({ user });
    res.json({ result: "ok" });
  }
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
