var usersDB = require("../models/userModel");
//var usersDB = require("../models/userModel.js");

function SignUp(user) {
  try {
    let res = usersDB.findOne(user.id);
    console.log("SignUp", res);
    if (!res) {
      usersDB.insert(user);
      res = usersDB.findOne(user.id);
    }
    return { res };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function SignIn(id, password) {
  const userRecord = usersDB.findOne({ id });
  if (!userRecord) {
    throw new Error("User not registered");
  }

  console.log(password);
  return { userRecord };
  /**  password check
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
    */
}

module.exports = { SignUp, SignIn };
