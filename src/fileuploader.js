import SummernotePlugin from './SummernotePlugin'

class FileUploader extends SummernotePlugin {
  constructor(context) {
    super(context);    
  }

  // ㅜnew button 
  'button.hello' () {
    const ui = $.summernote.ui; 
    
    // create button
    var button = ui.button({
      contents: 'Uploader',
      tooltip: 'File Uploader',
      click: () => {
        this.$panel.show();
        this.$panel.hide(500);
        // invoke insertText method with 'hello' on editor module.
        this.invoke('editor.insertText', 'hello');
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }

  'summernote.init' (we, e) {
    console.log('summernote initalized');
  }

  'summernote.keyup' (we, e) {
    console.log('summernote keyup', e);
  }

  initialize () {
    super.initialize();

    this.$panel = $('<div class="hello-panel"/>').css({
      position: 'absolute',
      width: 100,
      height: 100,
      left: '50%',
      top: '50%',
      background: 'red'
    }).hide();

    this.$panel.appendTo('body');

  }

  destroy () {
    super.destroy();

    this.$panel.remove();
    this.$panel = null;
  }

  /* upload util method  */
  upload (file, target) {

  }

}

export default FileUploader;