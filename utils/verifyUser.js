const jwt = require("jsonwebtoken");
function verifyUser(req, res, next) {
  const authCode = req.body.authorization;
  if (!authCode) {
    return res.json({
      status: "error",
      message: "Unauthorized Access.",
      logOut: true,
    });
  }
  const token = authCode.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.json({
        status: "error",
        message: "Access Denied.",
        logOut: true,
      });
    }
    req.decoded = decoded;
  });
  next();
}
module.exports = verifyUser;
