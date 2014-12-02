var config = new require('./config').Config('development');
var init_app = require('./app').init_app;

// 实例化应用
var app = init_app(config);

// 启动应用实例
var port = config.PORT || 3000;
app.listen(port, function() {
  console.info('Application running on port %d.'.green, port);
  console.info('You can now visit '.green +
               ('http://localhost:'+config.PORT).underline.blue +
               ' via your browser.'.green);
});
