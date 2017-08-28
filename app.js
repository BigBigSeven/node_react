var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('*', function (req, res) {
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
