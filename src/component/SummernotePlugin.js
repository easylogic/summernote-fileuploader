import EventMachin from "../util/EventMachin";

class SummernotePlugin extends EventMachin {
  constructor(context) {
    super();
    this.context = context; 
    this.events = {};
    this.initializeSummernoteResources();
  }

  getOptions (key) {
    return this.context.options[key] || {};
  }

  initializeSummernoteResources () {
    this.filterProps('button.').forEach(key => {
      this.context.memo(key, this[key].bind(this));
    });

    // set summernote.xxx event 
    this.filterProps('summernote.').forEach(key => {
      this.events[key] = this[key].bind(this);
    });
  }

  invoke () {
    this.context.invoke.apply(this.context, [...arguments]);
  }

  initialize() {

    super.initializeEvent();
  }

  destroy() {
    super.destroy();
  }


}

export default SummernotePlugin