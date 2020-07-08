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
  res.render("login", { title: "배민 사장님광장" });
});

/* GET logout page. */
router.get("/logout", function (req, res, next) {
  res.session.clearSession();
  res.redirect("/");
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* GET compelete register page. */
router.get("/complete_register", function (req, res, next) {
  res.render("complete_register", {
    user: {
      name: "name",
      id: "id",
      email: "email",
      phone: "010",
    },
  });
});

module.exports = router;
