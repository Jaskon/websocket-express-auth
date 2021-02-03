const { chatEvents } = require('./chat/chat-events');
const { fileEvents } = require('./file/file-events');
const { socketFileUploaderSetUp } = require('./file/socket-file-uploader-set-up');
const allowedOrigins = ['http://localhost:3000'];


function wsHandler(io) {
  return function(socket) {
    const uploader = socketFileUploaderSetUp(socket);

    // Move to fileUploadEvents()?
    uploader.on('start', ev => { console.log('File upload started'); })
    uploader.on('complete', ev => { console.log('File uploaded'); })

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
