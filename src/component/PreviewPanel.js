import Dom from '../util/Dom'

class PreviewPanel {
  constructor(uploader, context /* summernote context */) {
    this.uploader = uploader;
    this.context = context; 
    this.options = this.uploader.getOptions(); 

    this.renderFunc = this.parseRender(this.options.render);
    this.initialize();
  }


  isFunction (it) {
    return typeof it === 'function';
  }

  isString (it) {
    return typeof it === 'string';
  }

  parseRender (render) {
    var result = {};

    if (!render) return result; 

    if (render.itemClass) {
      if (this.isFunction(render.itemClass)) {
        result.itemClass = (file, i) => {
          return render.itemClass;
        }
      } else if (this.isString(render.itemClass)) {
        result.itemClass = (file, i) => {
          return render.itemClass(file, i);
        }
      }
    }

    if (render.itemStyle) {
      if (this.isFunction(render.itemStyle)) {
        result.itemStyle = (file, i) => {
          return render.itemStyle(file, i);
        }
      } else {
        result.itemStyle = (file, i) => {
          return render.itemStyle;
        }
      }
    }

    if (render.template) {
      if (this.isString(render.template)) {
        result.template = (file, i) => {
          return render.template; 
        }
      } else if (this.isFunction(render.template)) {
        result.template = (file, i) => {
          return render.template(file, i);
        }
      } 
    }

    if (render.previewClass) {
      if (this.isString(render.previewClass)) {
        result.previewClass = (file, i) => {
          return render.previewClass; 
        }
      } else if (this.isFunction(render.previewClass)) {
        result.previewClass = (file, i) => {
          return render.previewClass(file, i);
        }
      } 
    }
    
    return result;
  }
  

  initialize () {

    this.$el = new Dom('div', 'summernote-fileuploader-preview-panel');
    this.$el.addClass(this.renderFunc.previewClass());

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
    });

    let tpl = this.renderFunc.template(file, index);
    let className = this.renderFunc.itemClass(file, index);
    let styles = this.renderFunc.itemStyle(file, index);

    $el.html(tpl);
    $el.addClass(className);
    $el.css(styles);

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