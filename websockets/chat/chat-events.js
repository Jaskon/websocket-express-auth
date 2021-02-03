const { CHAT_MESSAGE } = require('../EVENTS');


function chatEvents(socket, io) {
  socket.on(CHAT_MESSAGE, data => {
    data.user = data.user || '<Anonymous>';
    if (!data.message) {
      return;
    }

    // socket.broadcast.emit - to all except sender
    // socket.emit - to sender only
    io.emit(CHAT_MESSAGE, data);  // To all (including sender)
  });
}

module.exports = {
  chatEvents
}
