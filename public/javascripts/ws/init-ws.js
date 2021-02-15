let socket;
let socketFileUploader;
wsConnect();

function wsConnect() {
  socket = io({
    transports: ['websocket'],
    reconnectionAttempts: 5,
    auth: {
      token: 'asdf Bearer',
      something: 'hello'
    }
  });

  socketFileUploader = socketFileUploaderSetUp(socket);

  socket.on('connect', connectHandler);
  socket.on('connect_error', connectErrorHandler);

  // There is also onAny event, that is saving the order of 'middlewares'
  socket.prependAny((eventName, ...args) => {
    console.log(`Message from server. Event name: ${eventName}. Args: `, args);
  });

  // Communication
  chatEvents(socket);
  fileEvents(socket, socketFileUploader);
}


function connectHandler(socket) {
  return function() {
    socket.emit('meta', '[Client] Connected!')
    console.log('Connected to ws', socket.id);
  }
}

function connectErrorHandler(e) {
  console.log('Connection error', e);
}
