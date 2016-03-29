var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
var main     = express();

var routes = require('./routes/api.js');

main.use(logger('dev'));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cookieParser());

main.use(express.static(path.join(__dirname, '../public')));

main.use('/user/', routes);

main.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'views/index.html'));
});

main.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// error handlers

// development error handler
// will print stacktrace
if (main.get('env') === 'development') {
  main.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
main.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = main;
