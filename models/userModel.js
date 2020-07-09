"use strict";

var DataStore = require("nedb");
var usersDB = new DataStore({
  filename: __dirname + "/../db/users.db",
  autoload: true,
});

module.exports = { usersDB };
