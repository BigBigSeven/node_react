var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const {
  auth_deserialize,
  auth
} = require('./calculation');
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    auth_deserialize(id, function(results) {
      done(null, results[0]);
    });
  });

  /*  身份验证策略  */
  passport.use('local', new LocalStrategy({ usernameField: 'username' },
    function(username, password, done) {
      console.log(username);
      if (!username) {
        return done(err);
      }
      auth(username,function(results){
        if(!results.length) {
          return done(null, false);
        } 
        // 密码匹配
        if(results[0].password === password) {
          return done(null, results[0]);
        } 
        return done(null, false);
      })
  }));
}