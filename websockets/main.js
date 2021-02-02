const { deserialize } = require("./serializer");
const { chatEvents } = require('./chat/chat-events');
const { fileEvents } = require('./file/file-events');
const allowedOrigins = ['http://localhost:3000'];


function wsLogMiddleware(socket, next) {
  // Parse message
  const { type, data } = deserialize(socket);
  console.log(`Message of type '${type}' received from client:`, data);
  next();
}


function wsHandler(io) {
  return function(socket) {
    // if (!allowedOrigins.includes(request.headers.origin)) {
    //   return ws.close();
    // }

    chatEvents(socket, io);
    fileEvents(socket, io);

    socket.emit('meta', '[Server] Connected!');
  }
}

module.exports = {
  wsLogMiddleware,
  wsHandler
};
