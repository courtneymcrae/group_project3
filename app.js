var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path         = require('path');


//routes
var userRoutes = require('./config/routes/userRoutes');
var passportRoutes = require('./config/routes/passportRoutes');
var restaurantRoutes = require('./config/routes/restaurantRoutes');
var apiRoutes = require('./config/routes/apiRoutes');


//connect to mongodb via mongoose
mongoose.connect('mongodb://localhost/burrito-app');



//middleware for logger and parsers
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

//set EJS for the views
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//passport and sessions
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// This middleware will allow us to use the current user in the layout
app.use(function (req, res, next) {
  global.user = req.user;
  next()
});


app.use('/users', userRoutes);
app.use('/passport', passportRoutes);
app.use( '/restaurants', restaurantRoutes);
app.use('/api', apiRoutes);


app.listen(3000);
