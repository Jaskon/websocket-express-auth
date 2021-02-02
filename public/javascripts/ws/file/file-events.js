function fileEvents(socket) {
  socket.on('file-uploaded', data => {
    // TODO
  });
}


//* File API

function sendFileWS(file) {
  const reader = new FileReader();
  reader.addEventListener('loadend', ev => {
    socket.emit('file-upload', file);
    console.log('File uploaded');
  });
  reader.readAsArrayBuffer(file);
}
