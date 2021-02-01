function chatEvents({ type, data, wss }) {
  switch (type) {
    case 'chat-message':
      data.user = data.user || '<Anonymous>';
      if (!data.message) {
        return;
      }

      wss.broadcast('chat-message', data);
      break;
  }
}

module.exports = {
  chatEvents
}
