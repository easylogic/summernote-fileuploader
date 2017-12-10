import SummernotePlugin from './SummernotePlugin'
import Dom from '../util/Dom'
import FileManager from '../util/FileManager'
import UploadPanel from './UploadPanel'
import PreviewPanel from './PreviewPanel'

class FileUploader extends SummernotePlugin {
  constructor(context) {
    super(context);    
  }

  // ㅜnew button 
  'button.fileuploader' () {
    const ui = $.summernote.ui; 
    
    // create button
    var button = ui.button({
      contents: 'Uploader',
      tooltip: 'File Uploader',
      click: () => {
        this.$panel.show();
        // invoke insertText method with 'hello' on editor module.
        this.invoke('editor.insertText', 'hello');
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }

  // ㅜnew button 
  'button.simple-fileuploader' () {
    const ui = $.summernote.ui; 
    
    // create button
    var button = ui.button({
      contents: 'Simple Uploader',
      tooltip: 'File Uploader',
      click: () => {
        this.openFileDialog();
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }  

  openFileDialog () {
    this.uploadPanel.openFileDialog();
  }

  'summernote.init' (we, e) {
    console.log('summernote initalized');
  }

  'summernote.keyup' (we, e) {
    console.log('summernote keyup', e);
  }

  initialize () {
    super.initialize();

    this.previewPanel = new PreviewPanel(this, this.context);
    this.uploadPanel = new UploadPanel(this, this.context);
    this.fileManager = new FileManager(this, this.context);

    this.$panel = new Dom('div', 'summernote-fileuploader', {
      droppable : true 
    });

    this.$panel.append(this.uploadPanel.$el);
    this.$panel.append(this.previewPanel.$el);

    this.$panel.appendTo('body');

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
    this.files.push.apply(this.files, files);
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

export default FileUploader;