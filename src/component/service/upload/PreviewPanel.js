import Dom from '../../../util/Dom'
import File from '../../../util/File'

class PreviewPanel {
  constructor(service, context /* summernote context */) {
    this.service = service;
    this.context = context; 
    this.options = this.service.getOptions(); 

    this.previewClassFunc = this.parsePreviewClass(this.options.previewClass);
    this.itemClassFunc = this.parseItemClass(this.options.itemClass);
    this.itemStyleFunc = this.parseItemStyle(this.options.itemStyle);
    this.templateFunc = this.parseTemplate(this.options.template);

    this.initialize();
  }

  isFunction (it) {
    return typeof it === 'function';
  }

  isString (it) {
    return typeof it === 'string';
  }

  isObject (it) {
    return typeof it === 'object' && !Array.isArray(it);
  }

  parseItemClass (itemClass) {

    if (this.isString(itemClass)) {
      return (file, i) => {
        return itemClass;
      }
    } else if (this.isFunction(itemClass)) {
      return (file, i) => {
        return itemClass(file, i);  // return string 
      }
    } 

  }

  parseItemStyle (itemStyle) {
    
    if (this.isFunction(itemStyle)) {
      return (file, i) => {
        return itemStyle(file, i);  // return object 
      }
    } else if (this.isObject(itemStyle)) {
      return (file, i) => {
        return itemStyle;
      }
    }
  }

  parseTemplate (template) {
    if (this.isFunction(template)) {
      return (file, i) => {
        return template(file, i);   // return string or dom or domlist
      }
    } else if (this.isString(template)) {
      return (file, i) => {
        return template; 
      } 
    } 

  }

  parsePreviewClass (previewClass) {
    if (this.isString(previewClass)) {
      return () => {
        return previewClass; 
      } 
    } else if (this.isFunction(previewClass)) {
      return () => {
        return previewClass();  // return string 
      }
    }
  }
  
  initialize () {

    this.$el = new Dom('div', 'preview-panel');

    if (this.previewClassFunc) {
      this.$el.addClass(this.previewClassFunc());
    }


    this.initializeEvent();  
  }

  refresh () {
    this.render();
  }

  getFileSize (size, fixed = 0) {
    return File.filesize(size, fixed)
  }

  getFileType (type) {
    return File.filetype(type)
  }  

  updateProgress (index, uploadedPercent) {
    const $progressbar = this.$el.find("[data-index='" + index + "']").find(".file-progress-bar");

    if ($progressbar) {
      $progressbar.css('width', uploadedPercent + '%');
    }
  }

  templateItem (file, index) {

    let image_url = 'about:blank';
    let file_name = file.name;
    let file_size = this.getFileSize(file.size); 
    let file_type = this.getFileType(file.type); 

    if (file.type.indexOf('image') > -1) {
      image_url = URL.createObjectURL(file)
    } else { 

    }

    const tpl = `
      <img src="${image_url}" class='preview-image' />
      <div class="item-close">
        <span>&times;</span>
      </div>
      <div class="file-info" >
        <div class="file-name" title="${file_name}" >
          <span class="file-type" >${file_type}</span>
          ${file_name}
        </div>
        <div class="file-size" >${file_size}</div>
      </div>
      <div class="file-progress"><div class="file-progress-bar"></div></div>
    `

    return tpl

  }

  refreshItemStatus (index, status) {

    let $currentViewItem = this.$el.find("[data-index='"+index+"']");
    $currentViewItem.addClass(status);

  }

  renderViewItem (index) {
    const file = this.service.getFile(index);

    let $el = new Dom('div', 'view-item', { 
      'data-index' : index, 
      'data-name' : file.name,
      'data-type' : file.type,
      'data-size': file.size 
    });

    if (file.selected) {
      $el.addClass('selected')
    }

    if (file.success) {
      $el.addClass('success');
    }

    if (file.fail) {
      $el.addClass('fail');
    }

    if (this.templateFunc) {
      let tpl = this.templateFunc(file, index);
      $el.html(tpl);      
    } else {
      let tpl = this.templateItem(file, index);
      $el.html(tpl);
    }

    if (this.itemClassFunc) {
      let className = this.itemClassFunc(file, index);
      $el.addClass(className);      
    }

    if (this.itemStyleFunc) {
      let styles = this.itemStyleFunc(file, index);
      $el.css(styles);
    }

    return $el; 
  }

  render () {

    var length = this.service.length();
    var arr = [];

    for(var index = 0; index < length; index++) {
      arr[index] =  this.renderViewItem(index);
    }

    this.$el.html(arr);
  }

  itemClick (e) {
    const $target = new Dom(e.target);

    const $itemClose = $target.closest('item-close');
    if ($itemClose) {
      const $viewItem = $target.closest('view-item');

      if ($viewItem) {
        this.service.deleteFile($viewItem.attr('data-index'));
        $viewItem.remove();
      }

    } else {
      const $viewItem = $target.closest('view-item');      
      if ($viewItem) {
        $viewItem.toggleClass('selected')
        this.service.selectFile($viewItem.attr('data-index'), $viewItem.hasClass('selected'));
      }
    }

  }

  initializeEvent() {
    this.callbackItemClick = this.itemClick.bind(this);

    this.$el.on('click', this.callbackItemClick);
  }

  destroy() {

    this.$el.off('click', this.callbackItemClick);

    this.$el.remove();        
    this.$el = null;
  }


  /* upload event method  */
  response (index) {
    // NOOP 
  }  
  success (index) {
    this.refreshItemStatus(index, 'success')
  }

  progress (index, loaded, total) {
    this.updateProgress(index, (loaded/total) * 100);
  }

  fail (index) {
    this.refreshItemStatus(index, 'fail')
  } 

  abort (index) {

  }
}

export default PreviewPanel