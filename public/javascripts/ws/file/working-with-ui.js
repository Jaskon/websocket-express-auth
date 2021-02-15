let fileUploadProgressBar;

function initFileUiHandlers() {
  document.getElementById('btn-upload-file').addEventListener('click', ev => {
    const files = document.getElementById('input-file-name').files;
    sendFilesWS(files);
  });

  document.getElementById('btn-list-files').addEventListener('click', ev => {
    window.location = '/files';
  });

  document.getElementById('btn-simulate-error').addEventListener('click', ev => {
    // TODO: disconnect socket?
    simulateSocketError();
  });

  fileUploadProgressBar = document.getElementById('file-upload-progress');
}


// Progress bar
function setFileUploadProgress(percent) {
  fileUploadProgressBar.style.width = `${percent}%`;
}
