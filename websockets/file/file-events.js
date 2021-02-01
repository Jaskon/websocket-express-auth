const fs = require('fs');


function fileEvents({ data, ws }) {
  console.log(`File received. Size: ${data.byteLength}`);
  fs.writeFile('doc.pdf', data, () => {
    console.log('File written to doc.pdf')
  });
}


module.exports = {
  fileEvents
}
