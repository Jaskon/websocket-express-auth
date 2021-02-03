const siofu = require('socketio-file-upload');


function socketFileUploaderSetUp(socket) {
  const uploader = new siofu();
  uploader.dir = './files-uploaded';
  uploader.listen(socket);

  return uploader;
}


module.exports = {
  socketFileUploaderSetUp
}
