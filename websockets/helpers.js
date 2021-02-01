const WebSocket = require('ws');
const { serialize } = require("./serializer");
const WebSocketServer = require('ws').Server;


// Defining new methods (helpers)

function updateWSPrototype() {

  WebSocket.prototype.sendMessage = function (type, data) {
    this.send(serialize(type, data));
  }

  WebSocketServer.prototype.broadcast = function (type, data) {
    this.clients.forEach(client => client.sendMessage(type, data));
  }
}


module.exports = {
  updateWSPrototype
}
