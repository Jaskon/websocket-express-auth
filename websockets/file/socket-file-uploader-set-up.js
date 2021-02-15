const siofu = require('../../lib/siofu-server');


function socketFileUploaderSetUp(socket) {
  const uploader = new siofu({
    dir: './files-uploaded',
    reconnectOnFail: true
  });
  uploader.listen(socket);

  return uploader;
}


module.exports = {
  socketFileUploaderSetUp
}
