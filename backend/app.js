const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser')
const session = require("express-session")
const mongoStore = require('connect-mongo')(session);
const helmet = require('helmet')
const compression = require('compression')

require('./config/db')
const config = require('./config')

// backend routes
const sgg_map = require('./routes/sgg_map');
const sd_map = require('./routes/sd_map');
const loginEmail = require('./routes/loginEmail');
const overallDeathSd = require('./routes/overall_death/sd');
const overallDeathSgg = require('./routes/overall_death/sgg');
const GenderOverallDeathSgg = require('./routes/overall_death/gender');
const pm2_5_sd = require('./routes/pm2_5/sd');
const pm2_5_sgg = require('./routes/pm2_5/sgg');
const districts = require('./routes/districts');
const chart = require('./routes/chart');
const IndexTotalPm10 = require('./routes/index_total_pm10');
const OpenAPIPm2_5 = require('./routes/openapi/fine_dust');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  const allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3001', 'http://127.0.0.1:80', 'http://127.0.0.1', 'http://0.0.0.0:3001', 'http://localhost:3001', 'http://localhost:80', "http://pmhealth.slowalk.net", "https://pmhealth.slowalk.net", "https://pmhealth.team-d.work", "http://pmhealth.team-d.work", "http://218.52.115.164:3001", "http://openapi.airkorea.or.kr"];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // res.setHeader('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");

  next();
});
app.use(compression())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
  secret: 'p!qo@ecz#$ck^a',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: config.db_path,
    autoRemove: 'native',
  })
}))

app.use(helmet({
  frameguard: {
    action: 'sameorigin'
  }
}))

app.use('/v1/sgg_map', sgg_map);
app.use('/v1/sd_map', sd_map);
app.use('/v1/login', loginEmail);
app.use('/v1/overall_death/sd', overallDeathSd);
app.use('/v1/overall_death/sgg', overallDeathSgg);
app.use('/v1/overall_death/gender', GenderOverallDeathSgg);
app.use('/v1/pm2_5/sd', pm2_5_sd);
app.use('/v1/pm2_5/sgg', pm2_5_sgg);
app.use('/v1/districts', districts);
app.use('/v1/chart', chart);
app.use('/v1/index_total_pm10', IndexTotalPm10);
app.use('/v1/openapi/fine_dust', OpenAPIPm2_5);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
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

if(app.get('env') == "development") {
  app.listen(3000);
}

module.exports = app;