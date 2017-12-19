import Dom from '../../../util/Dom'

class UploadPanel {
  constructor(service, context /* summernote context */) {
    this.service = service;
    this.context = context; 
    this.options = this.service.getOptions();
    this.initialize();
  }

  initialize () {

    this.$el = new Dom('div', 'upload-panel');
    this.$fileInput = new Dom('input', '', { 
      type : 'file', 
      multiple : true, 
      placeholder : '클릭하거나 파일을 끌어다 놓습니다.',
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
    this.service.addFile([...e.target.files]);
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