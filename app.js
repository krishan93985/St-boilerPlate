const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const compression = require('compression');

const passport = require('passport');

const indexWebRouter = require('./routes/web/index');
const usersWebRouter = require('./routes/web/user');
const dashboardWebRouter = require('./routes/web/dashboard');

const indexMobileRouter = require('./routes/mobile/index');
const usersMobileRouter = require('./routes/mobile/user');
const dashboardMobileRouter = require('./routes/mobile/dashboard');


const app = express();

/* const hbs = expressHbs.create({
  helpers:{
    if_eq: function(a, b, opts){
      if(a === b){
        return opts.fn(this);
      }
    }
  },
  extname: '.hbs',
  defaultLayout: 'layout'
}); */
const hbs = expressHbs.create({
  helpers:{
      if_eq: function(a, b, opts){
          if(a === b){
              return opts.fn(this);
          }
      },
      if_not_eq: function(a, b, opts){
          if(a!==b){
              return opts.fn(this);
          }
      }
  },
  extname: '.hbs',
  defaultLayout: 'layout'
});

//Setting Up View Engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// User Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexWebRouter);
app.use('/user', usersWebRouter);
app.use('/dashboard', dashboardWebRouter);

app.use('/mobile/', indexMobileRouter);
app.use('/mobile/user', usersMobileRouter);
app.use('/mobile/dashboard', dashboardMobileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

let port = process.env.PORT;
if (port == null || port === "") {
  port = 3070;
}

// app.listen(process.env.PORT || 80, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

app.listen(port , function(){
  console.log("Server Started successfully");
  
})

module.exports = app;
