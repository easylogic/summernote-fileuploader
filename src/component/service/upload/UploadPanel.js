import Dom from '../../../util/Dom'

class UploadPanel {
  constructor(uploader, context /* summernote context */) {
    this.uploader = uploader;
    this.context = context; 
    this.options = context.options.fileuploader || {};
    this.initialize();
  }

  initialize () {

    this.$el = new Dom('div', 'summernote-fileuploader-upload-panel');
    this.$fileInput = new Dom('input', '', { 
      type : 'file', 
      multiple : true, 
      accept : this.options.accept || '*/*' 
    });
    
    this.$el.append(this.$fileInput);

    this.initializeEvent();
  }

  openFileDialog () {
    // simple file uploader 
    this.$fileInput.el.click();
  }

  changeFileInput (e) {
    this.uploader.addFile([...e.target.files]);
  }

  initializeEvent() {

    this.$$changeFileInput = this.changeFileInput.bind(this);

    this.$fileInput.addEventListener('change', this.$$changeFileInput);
  }

  appendTo (selector) {
    const el = document.querySelector(selector);

    if (el) {
      this.$el.appendTo(el);
    }

  }

  destroy() {
    this.$fileInput.removeEventListener('change', this.$$changeFileInput);
    this.$el.remove();    
    this.$fileInput = null;
    this.$el = null;    
  }
}

export default UploadPanel