const { deserialize } = require("./serializer");
const { chatEvents } = require('./chat/chat-events');
const { fileEvents } = require('./file/file-events');
const allowedOrigins = ['http://localhost:3000'];
// Implicitly change WS prototypes
require('./helpers').updateWSPrototype();


function wsHandler(wss, ws, request) {
  // if (!allowedOrigins.includes(request.headers.origin)) {
  //   return ws.close();
  // }

  ws.on('message', (mes) => {
    // Binary events
    if (typeof mes !== 'string') {
      fileEvents({data: mes, ws, wss});
      return;
    }

    // Parse message
    const { type, data } = deserialize(mes);
    console.log(`Message of type '${type}' received from client:`, data);

    // Communication
    chatEvents({ type, data, ws, wss });
  });

  ws.sendMessage('meta', '[Server] Connected!');
}

module.exports = wsHandler;
