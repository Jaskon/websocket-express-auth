function fileEvents(socket) {
  socket.on('file-uploaded', data => {
    console.log('File uploaded');
  });

  socket.on('file-written', data => {
    console.log('File written');
  });
}


//* File API

function sendFileWS(file) {
  // const reader = new FileReader();
  // reader.addEventListener('loadend', ev => {
  //   socket.emit('file-upload', file);
  //   console.log('File upload started');
  // });
  // reader.readAsArrayBuffer(file);
  socketFileUploader.submitFiles([file]);
}
