function fileEvents(type, data) {
  switch (type) {
    case 'file-uploaded':
      // TODO
      break;
  }
}


//* File API

function sendFileWS(file) {
  const reader = new FileReader();
  reader.addEventListener('loadend', ev => {
    ws.send(file);
  });
  reader.readAsArrayBuffer(file);
}
