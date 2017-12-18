class SummernotePlugin {
  constructor(context) {
    this.context = context; 
    this.events = {};
    this.initializeSummernoteResources();
  }

  getOptions (key) {
    return this.context.options[key] || {};
  }

  filterProps (pattern) {
    return Object.getOwnPropertyNames(this.__proto__).filter(key => {
      return key.includes(pattern);
    });
  }

  initializeSummernoteResources () {
    this.filterProps('button.').forEach(key => {
      this.context.memo(key, this[key].bind(this));
    });

    this.filterProps('summernote.').forEach(key => {
      this.events[key] = this[key].bind(this);
    });
  }

  invoke () {
    this.context.invoke.apply(this.context, [...arguments]);
  }

  initialize() {

  }

  destroy() {

  }


}

export default SummernotePlugin