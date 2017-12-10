import Dom from '../util/Dom'

class PreviewPanel {
  constructor(uploader, context /* summernote context */) {
    this.uploader = uploader;
    this.context = context; 

    this.initialize();
  }

  initialize () {

    this.$el = new Dom('div', 'summernote-fileuploader-preview-panel');

    this.initializeEvent();
  }

  refresh () {
    this.render();
  }

  renderViewItem (file, index) {
    let $el = new Dom('div', 'view-item', { 
      'data-index' : index, 
      'data-name' : file.name,
      'data-type' : file.type,
      'data-file' : file
    }).html('item');

    return $el; 
  }

  render () {

    var arr = this.uploader.getFiles().map((file, index) => {
        return this.renderViewItem(file, index);
    })

    this.$el.html(arr);
  }

  initializeEvent() {

  }

  destroy() {
    this.$el.remove();        
    this.$el = null;
  }
}

export default PreviewPanel