var User = require('./models').User;

exports.signin = function(req, res) {
  console.log("this is a log");
  if (req.method === 'GET') return res.render('account/signin');
};

exports.signup = function(req, res) {
  if (req.method === 'GET') return res.render('account/signup');
};


