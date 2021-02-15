const fs = require('fs');
const { FILE_UPLOADED, FILE_WRITTEN, FILE_UPLOAD } = require('../EVENTS');


function fileEvents(socket, io) {
  socket.on(FILE_UPLOAD, file => {
    console.log(`File received. Size: ${file.byteLength}`);
    socket.emit(FILE_UPLOADED);

    fs.writeFile('doc.pdf', file, () => {
      console.log('File written to doc.pdf')
      socket.emit(FILE_WRITTEN);
    });
  });

  socket.on('simulate-error', () => {
    socket.server.engine.close();
  });
}


module.exports = {
  fileEvents
}
