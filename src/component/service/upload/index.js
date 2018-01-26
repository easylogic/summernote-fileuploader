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

    this.$el = new Dom('div', 'summernote-upload-service-panel', {
      droppable : true 
    });

    this.$el.append(this.uploadPanel.$el);
    this.$el.append(this.previewPanel.$el);

    this.initializeEvent();
  }

  drop (e) {
    e.preventDefault()
    this.addFile([...e.dataTransfer.files])
  }

  dragover (e) {
    e.preventDefault()
  }

  initializeEvent () {

    this.$$drop = this.drop.bind(this);
    this.$$dragover = this.dragover.bind(this);

    this.$el.on('drop', this.$$drop);
    this.$el.on('dragover', this.$$dragover);    

    this.initializeFileEvent();
  }

  initializeFileEvent () {

    /* upload event method  */    
    ['response', 'success', 'progress', 'fail', 'abort'].forEach((field) => {
<<<<<<< HEAD
      this[field] = (index, opt1, opt2, opt3) => {
        if (typeof this.options[field] === 'function') {
          this.options[field](this.getFile(index), index, opt1, opt2, opt3);
        }

        if (typeof this.previewPanel[field] === 'function' ) {
          this.previewPanel[field](index, opt1, opt2, opt3);
=======
      this[field] = (index, opt1, opt2) => {
        if (typeof this.options[field] === 'function') {
          this.options[field](this.getFile(index), index, opt1, opt2);
        }

        if (typeof this.previewPanel[field] === 'function' ) {
          this.previewPanel[field](index, opt1, opt2);
>>>>>>> 9cd08ecf6566b8fe1c9c7240b743611bef32fa95
        }

      }
    })
  }

  destroy () {
    super.destroy();

    this.$el.off('drop', this.$$drop);
    this.$el.off('dragover', this.$$dragover);    

    this.uploadPanel.destroy();
    this.previewPanel.destroy();

    this.uploadPanel = null;
    this.previewPanel = null; 


    this.$el.remove();
    this.$el = null; 
  }

  addFile (files) {

    if (!Array.isArray(files)) {
      files = [files];
    }

    this.fileManager.addFiles(files);
    this.previewPanel.refresh();

    // 파일 업로드 바로 실행하기 
    this.fileManager.uploadAllFiles();
  }

  length () {
    return this.fileManager.length();
  }
    
  getFiles () {
    return this.fileManager.getFiles(); 
  }

  getFile (index) {
    return this.fileManager.getFile(index);
  }

  selectFile (index, isSelected) {
    this.fileManager.selectFile(index, isSelected)
  }

  deleteFile (index) {
    this.fileManager.deleteFile(index)
  }  

}

export default UploadServicePanel;