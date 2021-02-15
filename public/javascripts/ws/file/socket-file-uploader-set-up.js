function socketFileUploaderSetUp(socket) {
  const siofu = new SocketIOFileUpload(socket, {
    chunkSize: 1024 * 1024,  // 1mb
    reconnectOnFail: true
  });

  return siofu;
}
