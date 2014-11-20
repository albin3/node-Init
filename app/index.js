var express = require('express'),
    path = require('path'),
    log4js = require('log4js'),
    colors = require('colors'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    redis  = require('redis'),
    get_redis_session = require('node-redis-session').get_redis_session;

exports.init_app = function(config) {
  var app = express();

  // config logger 
  log4js.configure({
    appenders: [
      { type: "console" },
      { type: "file",
        filename: path.join(config.LOG_DIR, config.APP_NAME + '.log'),
        maxLogSize: 20480,
        backups: 10,
        category: "default"
      }
    ],
    replaceConsole: true
  });
  // hang logger
  var logger = log4js.getLogger('default');
  app.use(log4js.connectLogger(logger, { level: 'auto' }));

  // hang static files
  app.use(config.STATIC_URI, express.static(path.join(config.__DIR, config.STATIC_DIR)));

  // hang req.body parser
  app.use(bodyParser.json()); //for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true }));//for parsing application/x-www-form-urlencoded

  // hang swig
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(config.__DIR, 'app', config.VIEWS_DIR));

  // hang NOSTATE
  var nostate = config.NOSTATE;
  for (var i=0; i<nostate.length; i++) {
    require(path.join(config.__DIR, 'app', app.MODULE_DIR, nostate[i])).init(app);
  }

  // hang cookieParser
  app.use(cookieParser());
  app.use(get_redis_session("PointsMall")); // session;

  // hang MUDULES
  var modules = config.MODULES;
  for (var i=0; i<modules.length; i++) {
    require(path.join(config.__DIR, "app",config.MODULE_DIR, modules[i])).init(app);
  }

  return app;
}
