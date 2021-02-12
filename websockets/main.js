const session = require('express-session');
const { sessionConfig } = require('../auth/helpers');
const { chatEvents } = require('./chat/chat-events');
const { fileEvents } = require('./file/file-events');
const { socketFileUploaderSetUp } = require('./file/socket-file-uploader-set-up');
const { wsLoginHandler } = require('../auth/ws');
const allowedOrigins = ['http://localhost:3000'];


// Middleware wrapper
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
const authEnabled = false;
const fakeDelay = null;  // In ms


function wsHandler(io) {

  io.use(wrap(session(sessionConfig)));
  // Authentication middleware
  if (authEnabled) {
    io.use(wsLoginHandler);
  }

  //! Simulate delay
  if (fakeDelay) {
    const oldIoEmit = io.emit;
    io.emit = function () {
      setTimeout(() => {
        oldIoEmit.apply(io, arguments);
      }, fakeDelay);
    }
  }

  // Runs after all middlewares (above)
  // All of them need to call next()
  return function(socket) {
    //! Simulate delay
    if (fakeDelay) {
      const oldEmit = socket.emit;
      socket.emit = function () {
        setTimeout(() => {
          oldEmit.apply(socket, arguments);
        }, fakeDelay);
      };
    }

    const uploader = socketFileUploaderSetUp(socket);

    // Move to fileUploadEvents()?
    uploader.on('start', ev => { console.log('File upload started'); });
    uploader.on('complete', ev => { console.log('File uploaded'); });
    uploader.on('error', ev => { console.error('File upload error', ev); });

    // if (!allowedOrigins.includes(request.headers.origin)) {
    //   return ws.close();
    // }

    // Log all messages
    socket.onAny((eventName, ...args) => {
      console.log(`Message of type '${eventName}' received from client. Args: `, args);
    });

    chatEvents(socket, io);
    fileEvents(socket, io);

    socket.emit('meta', '[Server] Connected!');
  }
}

module.exports = {
  wsHandler
};
