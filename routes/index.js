var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "배민상회",
    user: req.session ? req.session.user : null,
  });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "배민상회 로그인" });
});

/* GET logout page. */
router.get("/logout", function (req, res, next) {
  res.session.clearSession();
  res.redirect("/");
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "배민상회 회원가입",
  });
});

/* GET compelete register page. */
router.get("/complete_register", function (req, res, next) {
  var user = req.session.user;
  if (user) {
    res.render("complete_register", {
      title: "배민상회 가입완료",
      user,
    });
  }
});

module.exports = router;
