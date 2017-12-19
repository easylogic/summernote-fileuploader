import './index.css'
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

    this.initialize();
  }

  getTitle () {
    return this.title; 
  }

  openFileDialog () {
    this.uploadPanel.openFileDialog();
  }

  initialize () {
    super.initialize();

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

  /* upload util method  */
  upload (file, target) {

  }

}

export default UploadServicePanel;