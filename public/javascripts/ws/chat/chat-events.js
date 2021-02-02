function chatEvents(socket) {
  socket.on('chat-message', data => {
    addNewUserMessage(data.user, data.message);
  });
}


//* Chat API

function sendChatMessage(user, message) {
  socket.emit('chat-message', {user, message});
}
