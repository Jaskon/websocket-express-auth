function chatEvents(socket, io) {
  socket.on('chat-message', data => {
    data.user = data.user || '<Anonymous>';
    if (!data.message) {
      return;
    }

    // socket.broadcast.emit - to all except sender
    // socket.emit - to sender only
    io.emit('chat-message', data);  // To all (including sender)
  });
}

module.exports = {
  chatEvents
}
