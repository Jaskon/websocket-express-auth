const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const authSecret = 'asdf-123-secret';
const sessionStore = new MongoStore({
  url: 'mongodb://127.0.0.1:27017/websockets-test-auth'
});
const sessionConfig = {
  secret: authSecret,
  cookie: {
    maxAge: 3600 * 1000
  },
  store: sessionStore
};


function handleLogin(token, done) {
  console.log(`Trying to login with token '${token}'`);
  done(null, { name: 'User One' });
}


// Redirect if success
function handleLoginSuccess(req, res) {
  req.session.user = req.session.passport && req.session.passport.user;
  console.log('Login success: ', req.session.user);
  res.redirect('/');
}


// 401 if not authenticated
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Not authed');
  }
  console.log('Check auth');
  next();
}


module.exports = {
  authSecret,
  sessionStore,
  sessionConfig,
  handleLogin,
  handleLoginSuccess,
  checkAuth
}
