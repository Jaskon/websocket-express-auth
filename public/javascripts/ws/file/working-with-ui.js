function initFileUiHandlers() {
  document.getElementById('btn-upload-file').addEventListener('click', ev => {
    const file = document.getElementById('input-file-name').files[0];
    sendFileWS(file);
  });
}
