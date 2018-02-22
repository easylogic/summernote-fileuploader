import './index.scss'
import Dom from '../../../util/Dom'
import SummernotePlugin from '../../SummernotePlugin';

class DirectoryServicePanel extends SummernotePlugin {
  constructor(uploader, context) {
    super();

    this.uploader = uploader;
    this.context = context; 

    this.id = 'directory';
    this.title = "Directory";
    this.options = this.getOptions();

    this.initialize();
  }

  getTitle () {
    return this.title; 
  }


  getOptions () {
    return this.uploader.getOptions('upload') || {};
  }

  initialize () {

    this.$el = new Dom('div', 'summernote-directory-service-panel', {
      droppable : true 
    });

    super.initialize();
  }

  drop (e) {
    console.log('drop', e);
  }

  dragover (e) {
    console.log('dragover', e);
  }

  destroy () {
    super.destroy();

    this.$el.removeEventListener('drop', this.$$drop);
    this.$el.removeEventListener('dragover', this.$$dragover);    

    this.$el.remove();
    this.$el = null; 
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

export default DirectoryServicePanel;