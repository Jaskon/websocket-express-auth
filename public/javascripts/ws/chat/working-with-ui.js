function sanitize(txt) {
  return txt.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function addNewUserMessage(user, message) {
  // Escape characters
  user = sanitize(user);
  message = sanitize(message);

  const chatDiv = document.getElementById('chat');
  chatDiv.innerHTML += `<div><b>${user}</b>: ${message}</div>`;
}

function initChatUiHandlers() {
  document.getElementById('btn-send-message').addEventListener('click', () => {
    const messageField = document.getElementById('input-message');
    const userField = document.getElementById('input-nickname');

    sendChatMessage(userField.value, messageField.value);

    messageField.value = '';
  });
}
