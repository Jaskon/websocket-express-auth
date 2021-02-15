function fileEvents(socket, socketFileUploader) {
  socket.on('file-uploaded', data => {
    console.log('File uploaded');
  });

  socket.on('file-written', data => {
    console.log('File written');
  });

  socketFileUploader.addEventListener('progress', ev => {
    console.log(`File loading progress: ${ev.bytesLoaded} of ${ev.file.size}`);
    setFileUploadProgress(100 * ev.bytesLoaded / ev.file.size);
  });

  socketFileUploader.addEventListener('error', ev => {
    console.error('File uploading error: ', ev);
  });
}


//* File API

function sendFilesWS(files) {
  // const reader = new FileReader();
  // reader.addEventListener('loadend', ev => {
  //   socket.emit('file-upload', file);
  //   console.log('File upload started');
  // });
  // reader.readAsArrayBuffer(file);
  socketFileUploader.submitFiles(files);
}

function simulateSocketError() {
  socket.emit('simulate-error');
}
