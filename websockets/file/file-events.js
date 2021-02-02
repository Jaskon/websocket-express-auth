const fs = require('fs');


function fileEvents(socket, io) {
  socket.on('file-upload', file => {
    console.log(`File received. Size: ${file.byteLength}`);
    fs.writeFile('doc.pdf', file, () => {
      console.log('File written to doc.pdf')
    });
  });
}


module.exports = {
  fileEvents
}
