class FileManager {
  constructor(uploader, context) {
    this.uploader = uploader;
    this.context = context;
    this.options = this.context.options.fileuploader || {};

    this.server = this.options.server || {};

    this.files = []; 
  }

  uploadToServer (file, index) {

    let formData = new FormData();
    formData.append("summernote-file-index", index);
    formData.append("summernote-file", file);

    new Request({
      url : '',
      params : '', 
      formData : formData,
      success : (res) => {
        this.uploader.success(file, index);
      },
      updateProgress : (e) => {
        this.uploader.updateProgress(file, index, e.loaded, e.total);
      },
      fail : (e) => {
        this.uploader.fail(file, index);
      }
    }).send();

  }

  removeFile (index) {
    this.files.splice(index, 1);
  }

  addFile (file) {
    this.files.push(file);
  }

  addFiles (files) {
    if (!Array.isArray(files)) {
      files = [files];
    }

    files.forEach(file => {
      this.addFile(file);
    });
  }

  uploadFile (indexOrFile, index) {
    var file = indexOrFile;

    if (this.files[indexOrFile]) {
      file = this.files[indexOrFile];
    }

    this.uploadToServer(file, index);
  }

  uploadAllFiles (files) {
    const uploadFiles = files || this.files || [];
    
    uploadFiles.forEach((file, index) => {
      this.uploadFile(file, index);
    })
  }
}

export default FileManager;