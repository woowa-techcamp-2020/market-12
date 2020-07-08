const uid = require("uid-safe");

module.exports = function sessionMiddleware() {
  let sessions = {};
  return function (req, res, next) {
    res.session = {
      setSession: (data, option) => {
        const sid = uid.sync(18);
        res.cookie("_sid", sid, option);
        req.session = data;
        sessions[sid] = data;
      },
      clearSession: () => {
        if (req.cookies._sid) {
          res.cookie.clearCookie("_sid");
          req.session.data = null;
          delete sessions[req.cookies._sid];
        }
      },
    };

    if (req.cookies._sid) {
      const session = sessions[req.cookies._sid];
      if (!session) {
        res.clearCookie("_sid");
        req.session = null;
      } else req.session = session;
    }

    next();
  };
};
