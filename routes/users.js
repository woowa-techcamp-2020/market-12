var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  let user = req.body;

  console.log("테스트하자", user);
  res.render("complete_register", { user });
});

/* GET compelete register page. */
router.get("/phone_auth", function (req, res, next) {
  const number = req.query.auth_number;
  if (number.length === 6) {
    res.status(200);
    res.json({ result: "ok" });
  } else {
    res.status(401);
    res.json({ result: "error" });
  }
});

module.exports = router;
