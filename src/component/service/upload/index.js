import './index.scss'
import Dom from '../../../util/Dom'
import FileManager from './FileManager'
import UploadPanel from './UploadPanel'
import PreviewPanel from './PreviewPanel'

class UploadServicePanel {
  constructor(uploader, context) {
    this.uploader = uploader;
    this.context = context; 

    this.id = 'upload';
    this.title = "Upload";
    this.options = this.getOptions();

    this.initialize();
  }

  getTitle () {
    return this.title; 
  }

  openFileDialog () {
    this.uploadPanel.openFileDialog();
  }

  getOptions () {
    return this.uploader.getOptions('upload') || {};
  }

  initialize () {

    this.fileManager = new FileManager(this, this.context);
    this.previewPanel = new PreviewPanel(this, this.context);
    this.uploadPanel = new UploadPanel(this, this.context);

    this.$panel = new Dom('div', 'summernote-upload-service-panel', {
      droppable : true 
    });

    this.$panel.append(this.uploadPanel.$el);
    this.$panel.append(this.previewPanel.$el);

    this.initializeEvent();
  }

  drop (e) {
    console.log('drop', e);
  }

  dragover (e) {
    console.log('dragover', e);
  }

  initializeEvent () {

    this.$$drop = this.drop.bind(this);
    this.$$dragover = this.dragover.bind(this);

    this.$panel.addEventListener('drop', this.$$drop);
    this.$panel.addEventListener('dragover', this.$$dragover);    
  }

  destroy () {
    super.destroy();

    this.$panel.removeEventListener('drop', this.$$drop);
    this.$panel.removeEventListener('dragover', this.$$dragover);    

    this.uploadPanel.destroy();
    this.previewPanel.destroy();

    this.uploadPanel = null;
    this.previewPanel = null; 


    this.$panel.remove();
    this.$panel = null; 
  }

  addFile (files) {

    if (!Array.isArray(files)) {
      files = [files];
    }

    this.fileManager.addFiles(files);
    this.previewPanel.refresh();
  }

  getFiles () {
    return this.fileManager.getFiles(); 
  }

  /* upload event method  */
  success (file, index) {
    if (typeof this.options.success === 'function') {
      this.options.success(file, index);
    }
  }

  progress (file, index, loaded, total) {
    if (typeof this.options.progress === 'function') {
      this.options.progress(file, index, loaded, total);
    }
  }

  fail (file, index) {
    if (typeof this.options.fail === 'function') {
      this.options.fail(file, index);
    }
  } 

  abort (file, index) {
    if (typeof this.options.abort === 'function') {
      this.options.abort(file, index);
    }
  }

}

export default UploadServicePanel;