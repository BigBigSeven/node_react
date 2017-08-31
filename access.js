var jwt = require('jsonwebtoken');
var D = require('./defaultset');

/*  检测是否已经登陆的中间件，只用于页面跳转  */
module.exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
/*  检测token是否符合的中间件，用于API，减少数据库操作 */
module.exports.jsonwebtokenCheck = function jsonwebtokenCheck(req, res, next) {
  var token = req.cookies["asdoilnihon%jkhkjh%kt1"];
  //decode token
  if (token) {
    jwt.verify(token, D.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'have no access to this api' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: '没有权限'
    });
  }
}