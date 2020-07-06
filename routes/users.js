var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res) {
  let user = req.body;

  console.log(user);

  res.send("로그인 완료");
});

module.exports = router;
