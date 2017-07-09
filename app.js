let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let session = require('express-session');
let mongostore = require('connect-mongo')(session);
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let login = require('./routes/login');
let main = require('./routes/main');
let sessions = require('./routes/sessions');

let app = express();



// require to socket.io config
app.io = require('socket.io')();
let socket_manager = require('./sockets.js')(app.io);



// express-session config
app.use(session({
  secret: 'ssshhhhh', 
  resave: 'true', 
  saveUninitialized: 'true',
  store: new mongostore({
    url: 'mongodb://127.0.0.1:27017/chat-sockets',
    autoReconnect: true
  })
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// routes to index and partials
app.use('/', index);
app.use('/login', login);
app.use('/main', main);
app.use('/sessions', sessions);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
