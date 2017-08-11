var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// Model declarations
var db = require('./model/db');
var blob = require('./model/blobs');
var page = require('./model/pages');
var meta = require('./model/meta');
var contact = require('./model/contacts');
var seoTag = require('./model/seotags');

// Routes declaration
var index = require('./routes/index');
var users = require('./routes/users');
var blobs = require('./routes/blobs');
var pages = require('./routes/pages');
var metas = require('./routes/meta');
var contacts = require('./routes/contacts');
var seoTags = require('./routes/seotags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Cors declaration
var corsOptions = {
    origin: 'https://aqkhan.github.io/ng4-cms-frontend/'
};

// Enable multiple domains origin
app.use(function(req, res, next){
    var whitelist = ['localhost:4200', '', 'aqkhan.github.io'];
    var host = req.get('host');

    whitelist.forEach(function(val, key){
        if (host.indexOf(val) > -1){
            res.setHeader('Access-Control-Allow-Origin', host);
        }
    });

    next();
});

//app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log('Server running on: http://localhost:3000');

// App Routs
app.use('/', index);
app.use('/users', users);
app.use('/blobs', blobs);
app.use('/pages', pages);
app.use('/meta', metas);
app.use('/contact', contacts);
app.use('/seotags', seoTags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
