"use strict";

let DataStore = require("nedb"),
  usersDB = new DataStore({
    filename: __dirname + "/../db/users.db",
    autoload: true,
  });

module.exports = usersDB;
