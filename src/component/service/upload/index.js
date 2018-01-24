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

  /* upload event method  */
  response (index) {
    if (typeof this.options.success === 'function') {
      this.options.response(this.getFile(index), index);
    }
    this.previewPanel.response(index);    
  }

  success (index) {
    if (typeof this.options.success === 'function') {
      this.options.success(this.getFile(index), index);
    }
    this.previewPanel.success(index);    
  }

  progress (index, loaded, total) {
    if (typeof this.options.progress === 'function') {
      this.options.progress(this.getFile(index), index, loaded, total);
    }
    this.previewPanel.progress(index, loaded, total);    
  }

  fail (index) {
    if (typeof this.options.fail === 'function') {
      this.options.fail(this.getFile(file), index);
    }
    this.previewPanel.fail(index);    
  } 

  abort (index) {
    if (typeof this.options.abort === 'function') {
      this.options.abort(this.getFile(index), index);
    }
    this.previewPanel.abort(index);
  }

}

export default UploadServicePanel;