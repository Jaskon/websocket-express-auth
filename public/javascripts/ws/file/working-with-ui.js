function initFileUiHandlers() {
  document.getElementById('btn-upload-file').addEventListener('click', ev => {
    const files = document.getElementById('input-file-name').files;
    sendFilesWS(files);
  });

  document.getElementById('btn-list-files').addEventListener('click', ev => {
    window.location = '/files';
  });
}
