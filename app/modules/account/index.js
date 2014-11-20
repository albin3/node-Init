var views = require('./views');

exports.init = function(app) {
  app.get('/u/signin', views.signin);
  app.get('/u/signup', views.signup);
};
