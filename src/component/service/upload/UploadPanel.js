import Dom from '../../../util/Dom'
import SummernotePlugin from '../../SummernotePlugin';

class UploadPanel extends SummernotePlugin {
  constructor(service, context /* summernote context */) {
    super();
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
      placeholder : `Attach files by dragging & dropping, selecting them, or pasting from the clipboard.`,
      accept : this.options.accept || '*/*' 
    });
    
    this.$el.append(this.$fileInput);

    super.initialize();
  }

  openFileDialog () {
    // simple file uploader 
    this.$fileInput.el.click();
  }


  'change $fileInput' (e) {
    this.service.addFile([...e.target.files]);
  }

  appendTo (selector) {
    const el = document.querySelector(selector);

    if (el) {
      this.$el.appendTo(el);
    }

  }

  destroy() {
    this.$el.remove();    
    this.$fileInput = null;
    this.$el = null;    
  }
}

export default UploadPanel