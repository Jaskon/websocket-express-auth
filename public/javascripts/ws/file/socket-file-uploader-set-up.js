function socketFileUploaderSetUp(socket) {
  const siofu = new SocketIOFileUpload(socket);
  siofu.chunkSize = 1024 * 1024;  // 1mb

  return siofu;
}
