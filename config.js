var path = require('path');
var root_dir = __dirname;

var Config = function(env) {
  this.__DIR = __dirname;
  this.APP_NAME = "NODE_INIT";
  this.LOG_DIR = "log";
  this.PORT = 3027;
  this.DEBUG = false;
  this.VIEWS_DIR = 'templates';
  this.STATIC_URI = '/static';
  this.STATIC_DIR = 'static';
  this.MODULE_DIR = 'modules';      //app/modules/*
  this.NOSTATE = [  ];              //无状态服务-不需要Cookie Session支持
  this.MODULES = [ 'account' ];     //有状态服务
  this.REDISINFO = {
    host: 'localhost', 
    user: '',
    password: '',
    port: 6379
  };
  this.DBINFO = {
    host: 'localhost', 
    user: '',
    password: '',
    database: 'test',
    port: 3306
  };

  if (!env) env = "development";
  switch (env) {
    case "production":            //生产环境
      this.PORT = "over ride.";
      this.PRODUCTION = true;
    break;
    case "test":                  //测试环境
      this.DEBUG = true;
      this.TESTING = true;
    break;
    case "development":           //开发环境
      this.DEBUG = true;
      this.DEVELOPMENT = true;
    default:
    break;
  }
  return this;
}

exports.Config = Config;
