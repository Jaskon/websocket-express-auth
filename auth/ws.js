const cookieParser = require('cookie-parser');
const {authSecret, sessionStore} = require("./helpers");

function wsLoginHandler(socket, next) {
  // Auth token should be set on ui part as well
  // console.log('Handshake.auth: ', socket.handshake.auth);
  if (socket.request.session.user) {
    return next();
  }

  console.log('Not authenticated user tried to connect to ws!');
  socket.disconnect(true);
}


module.exports = {
  wsLoginHandler
}
