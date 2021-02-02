WebSocket.prototype.sendMessage = function(type, data) {
  this.send(wsDataSerialize(type, data))
};

let socket;
wsConnect();

function wsConnect() {
  socket = io({
    transports: ['websocket'],
    reconnectionAttempts: 50
  });

  socket.on('connect', connectHandler);
  socket.on('connect_error', connectErrorHandler);

  // There is also onAny event, that is saving the order of 'middlewares'
  socket.prependAny((eventName, ...args) => {
    console.log(`Message from server. Event name: ${eventName}. Args: `, args);
  });

  // Communication
  chatEvents(socket);
  fileEvents(socket);
}


function connectHandler(socket) {
  return function() {
    ws.sendMessage('meta', '[Client] Connected!')
    console.log('Connected to ws', socket.id);
  }
}

function connectErrorHandler(e) {
  console.log('Connection error', e);
}
