function chatEvents(type, data) {
  switch (type) {
    case 'chat-message':
      addNewUserMessage(data.user, data.message);
      break;
  }
}


//* Chat API

function sendChatMessage(user, message) {
  ws.sendMessage('chat-message', {user, message});
}
