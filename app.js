var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var passportconfig = require('./passportconfig');
var D = require('./defaultset');
var app = express();
passportconfig();
app.set('superSecret', D.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: app.get('superSecret'),
    cookie: { maxAge: 28800000 },
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
/*//实现热更新
const isDevelopment = process.argv.indexOf('--development') !== -1;
if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {

      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(__dirname + '/public'));
}*/
//登录
app.post('/authenticate', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ success: false, message: 'unauthenticated' });
        }
        var token = jwt.sign({ name: user.username, password: user.password }, D.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        req.login(user, function(err) {
            if (err) return next(err);
            res.cookie("asdoilnihon%jkhkjh%kt1", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); //向cookie存入一个token
            res.cookie("asdoilnihon%jkhkjh%kt2", req.user.username, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); //用户名存入cookie
            res.cookie("asdoilnihon%jkhkjh%kt3", req.user.id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); ////用户id
            res.json({
                success: true,
                message: 'authenticated',
                token: token
            });
        });
    })(req, res, next);
});
//登出
app.post('/logout', function(req, res) {
    res.clearCookie('asdoilnihon%jkhkjh%kto');
    req.logout();
});
//发送页面
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

//错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;