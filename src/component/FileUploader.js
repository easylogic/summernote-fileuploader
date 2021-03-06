import './FileUpload.scss'

import SummernotePlugin from './SummernotePlugin'
import Dom from '../util/Dom'

// service 
import UploadServicePanel from './service/upload/index'
import DirectoryServicePanel from './service/directory/index'

class FileUploader extends SummernotePlugin {
  constructor(context) {
    super(context);    
    this.services = {};     
    this.activeService = '';

    this.addService(new UploadServicePanel(this, this.context));
    this.addService(new DirectoryServicePanel(this, this.context));    

    this.setActiveService('upload');  // upload 서비스를 처음으로 선택     

    this.initializeUI();
    this.render();    
  }

  // new button 
  'button.fileuploader' () {
    const ui = $.summernote.ui; 
    
    // create button
    var button = ui.button({
      contents: 'Uploader',
      tooltip: 'File Uploader',
      click: () => {
        this.show();
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }

  getOptions(key) {

    let options = super.getOptions('fileuploader');

    if (key) {
      return options[key] || {} 
    }

    return options;
  }

  addService (service, key) {
    this.services[key || service.id] = service; 
  }

  removeService (id) {
    delete this.services[id];
    
    this.render();
  }

  setActiveService (id) {
    this.activeService = id; 
  }

  getActiveService() {
    return this.services[this.activeService];
  }


  reloadTab () {
    this.$tab.find('.active').removeClass('active');
    this.$tab.find('[data-id='+this.activeService+']').addClass('active');
  }

  reloadTabContents() {
    this.$tabContents.find('.active').removeClass('active');
    this.$tabContents.find('[data-id='+this.activeService+']').addClass('active');
  }

  'click $cancel' (e) {
    this.hide();
  }

  'click $select' (e) {
    this.getActiveService().select();
  }

  'click $tab .tab-item' (e) {
    let $target = e.$delegateTarget;

    if ($target.hasClass('active')) {

    } else {
      this.setActiveService($target.attr('data-id'))
      this.reloadTab();
      this.reloadTabContents();    
    }
  } 

  initializeUI () {

    this.$back = new Dom('div', 'fileuploader-back');

    if (this.getOptions().zIndex) {
      this.$back.css('z-index', this.getOptions().zIndex);
    }


    this.$el = new Dom('div', 'fileuploader', {
      droppable : true 
    });

    this.$back.append(this.$el);

    this.$back.appendTo('body');    
  }

  show () {
    this.$back.show();
  }

  hide () {
    this.$back.hide();
  }

  toggle () {
    this.$back.toggle();
  }

  render () {

    this.$el.empty();

    this.$tab = new Dom('div', 'tabs');
    this.$tabContents = new Dom('div', 'tab-contents');
    this.$footer = new Dom('div', 'footer');

    this.$el.append(this.$tab);
    this.$el.append(this.$tabContents);
    this.$el.append(this.$footer);

    this.renderTab();
    this.renderTabContent();
    this.renderFooter();
    
  }

  renderTab () {
    this.$tab.empty();

    let service = Object.keys(this.services);
    
    service.forEach((id) => {
      const ServiceObject = this.services[id];

      let $tabItem = new Dom('div', 'tab-item', {
        'data-id': id 
      }).html(ServiceObject.getTitle());

      if (id == this.activeService) {
        $tabItem.addClass('active');
      }

      this.$tab.append($tabItem);
    })


  }

  renderTabContent () {
    this.$tabContents.empty();

    let service = Object.keys(this.services);
    
    service.forEach((id) => {
      const ServiceObject = this.services[id];
      let $tabContentItem = new Dom('div', 'tab-contents-item', {
        'data-id' : id 
      }).html(ServiceObject.$el);

      if (id == this.activeService) {
        $tabContentItem.addClass('active');
      }

      this.$tabContents.append($tabContentItem);
    })    

  }

  renderFooter() {
    this.$footer.empty();

    this.$cancel = new Dom('button', 'cancel-button').html("Close");
    this.$select = new Dom('button', 'select-button').html("Select");

    this.$footer.append(this.$cancel);
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