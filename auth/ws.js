const passportSocketIo = require("passport.socketio");
const cookieParser = require('cookie-parser');
const {authSecret, sessionStore} = require("./helpers");

function wsLoginHandler() {
  return passportSocketIo.authorize({
    cookieParser: cookieParser(),
    // key: 'connect.sid',
    secret: authSecret,
    store: sessionStore,
    success: (...args) => {
      console.log(args)
    },
    fail: (...args) => {
      console.log(args)
    }
  })
}


module.exports = {
  wsLoginHandler
}
