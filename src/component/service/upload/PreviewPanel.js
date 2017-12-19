import Dom from '../../../util/Dom'

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

  renderViewItem (file, index) {
    let $el = new Dom('div', 'view-item', { 
      'data-index' : index, 
      'data-name' : file.name,
      'data-type' : file.type,
      'data-file' : file
    });

    if (this.templateFunc) {
      let tpl = this.templateFunc(file, index);
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

    var arr = this.service.getFiles().map((file, index) => {
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