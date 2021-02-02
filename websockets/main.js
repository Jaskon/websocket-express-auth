const { deserialize } = require("./serializer");
const { chatEvents } = require('./chat/chat-events');
const { fileEvents } = require('./file/file-events');
const allowedOrigins = ['http://localhost:3000'];


function wsHandler(io) {
  return function(socket) {
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
