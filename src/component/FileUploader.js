import SummernotePlugin from './SummernotePlugin'
import Dom from '../util/Dom'

// service 
import UploadServicePanel from './service/upload'

class FileUploader extends SummernotePlugin {
  constructor(context) {
    super(context);    
    this.services = {};     
  }

  // new button 
  'button.fileuploader' () {
    const ui = $.summernote.ui; 
    
    // create button
    var button = ui.button({
      contents: 'Uploader',
      tooltip: 'File Uploader',
      click: () => {
        this.$el.show();
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }

  getOptions() {
    return super.getOptions('fileuploader');
  }

  addService (service) {
    this.services[service.id] = service; 
  }

  removeService (id) {
    delete this.services[id];
    
    this.render();
  }

  initialize () {
    super.initialize();

    this.addService(new UploadServicePanel(this, this.context));


    this.$el = new Dom('div', 'summernote-fileuploader', {
      droppable : true 
    });

    this.$el.appendTo('body');


    this.render();
  }

  render () {
    this.$el.empty();

    this.createTab();
    this.createTabContent();
    this.createFooter();

    this.$el.append(this.$tab);
    this.$el.append(this.$tabContents);
    this.$el.append(this.$footer);
  }

  createTab () {
    this.$tab = new Dom('div', 'summernote-fileuploader-tabs');

    let service = this.getOptions().service || Object.keys(this.services);
    
    service.forEach((id) => {
      const ServiceObject = this.services[id];
      const $tabItem = new Dom('div', 'summernote-fileuploader-tab-item').html(ServiceObject.getTitle());
      $tab.append($tabItem);
    })

  }

  createTabContent () {
    this.$tabContents = new Dom('div', 'summernote-fileuploader-tab-contents');
    let service = this.getOptions().service || Object.keys(this.services);
    
    service.forEach((id) => {
      const ServiceObject = this.services[id];
      const $tabContentItem = new Dom('div', 'summernote-fileuploader-tab-contents-item').html(ServiceObject.$el);
      $tabContents.append($tabContentItem);
    })    
  }

  createFooter() {
    this.$footer = new Dom('div', 'summernote-fileuploader-footer');

    this.$select = new Dom('button', 'summernote-fileuploader-select-button');
    this.$footer.append(this.$select);

  }

  destroy () {
    super.destroy();

    for(let key in this.services) {
      if (this.services[key]) {
        this.services[key].destroy();
      }
    }

    this.services = null; 

    this.$el.remove();
    this.$el = null; 
  }


}

export default FileUploader;