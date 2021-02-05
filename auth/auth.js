const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const session = require('express-session');
const express = require('express');
const path = require("path");
const { sessionConfig, handleLogin, handleLoginSuccess, checkAuth, } = require("./helpers");
const router = express.Router();


// Init session
router.use(session(sessionConfig));

// Init passport
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use(new BearerStrategy(
  handleLogin
))


// Routes
router.get('/login-page', function(req, res) {
  return res.sendFile(path.join(__dirname, '../public/login.html'));
})

router.get('/login',
  passport.authenticate('bearer', { session: true }),
  handleLoginSuccess
);

router.get('/',
  checkAuth
);


module.exports = router;
