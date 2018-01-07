(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var SummernotePlugin = function () {
  function SummernotePlugin(context) {
    classCallCheck(this, SummernotePlugin);

    this.context = context;
    this.events = {};
    this.initializeSummernoteResources();
  }

  createClass(SummernotePlugin, [{
    key: 'getOptions',
    value: function getOptions(key) {
      return this.context.options[key] || {};
    }
  }, {
    key: 'filterProps',
    value: function filterProps(pattern) {
      return Object.getOwnPropertyNames(this.__proto__).filter(function (key) {
        return key.includes(pattern);
      });
    }
  }, {
    key: 'initializeSummernoteResources',
    value: function initializeSummernoteResources() {
      var _this = this;

      this.filterProps('button.').forEach(function (key) {
        _this.context.memo(key, _this[key].bind(_this));
      });

      this.filterProps('summernote.').forEach(function (key) {
        _this.events[key] = _this[key].bind(_this);
      });
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      this.context.invoke.apply(this.context, [].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);
  return SummernotePlugin;
}();

var Counter = 0;

var Dom = function () {
  function Dom(tag, className, attr) {
    classCallCheck(this, Dom);

    this._tag = tag;
    this._className = className;
    this._attr = attr;

    this.initialize();
  }

  createClass(Dom, [{
    key: 'initialize',
    value: function initialize() {
      if (typeof this._tag != 'string') {
        this.el = this._tag;
      } else {
        var el = document.createElement(this._tag);

        this.uniqId = Counter++;

        el.className = this._className;

        var attr = this._attr || {};
        for (var k in attr) {
          el.setAttribute(k, attr[k]);
        }

        this.el = el;
      }
    }
  }, {
    key: 'attr',
    value: function attr(key, value) {
      if (arguments.length == 1) {
        if (typeof key === 'string') {
          return this.el.getAttribute(key);
        } else if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
          for (var k in key) {
            this.el.setAttribute(k, key[k]);
          }
        }
      } else if (arguments.length == 2) {
        this.el.setAttribute(key, value);
      }

      return this;
    }
  }, {
    key: 'closest',
    value: function closest(cls) {
      var temp = this;
      var checkCls = false;

      while (!(checkCls = temp.hasClass(cls))) {
        if (temp.el.parentNode) {
          temp = new Dom(temp.el.parentNode);
        } else {
          return null;
        }
      }

      if (checkCls) {
        return temp;
      }

      return null;
    }
  }, {
    key: 'removeClass',
    value: function removeClass(cls) {
      this.el.className = Dom.trim((" " + this.el.className + " ").replace(' ' + cls + ' ', ' '));
    }
  }, {
    key: 'hasClass',
    value: function hasClass(cls) {
      if (!this.el.className) return false;

      var newClass = ' ' + this.el.className + ' ';
      return newClass.indexOf(' ' + cls + ' ') > -1;
    }
  }, {
    key: 'addClass',
    value: function addClass(cls) {
      if (!this.hasClass(cls)) {
        this.el.className = this.el.className + ' ' + cls;
      }

      return this;
    }
  }, {
    key: 'find',
    value: function find(selector) {
      return new Dom(this.el.querySelector(selector));
    }
  }, {
    key: 'findAll',
    value: function findAll(selector) {
      return [].concat(toConsumableArray(this.el.querySelectorAll(selector))).map(function (node) {
        return new Dom(node);
      });
    }
  }, {
    key: 'html',
    value: function html(_html) {
      if (arguments.length == 0) {
        return this.el.innerHTML;
      }

      if (typeof _html === 'string') {
        // html 
        this.el.innerHTML = _html;
      } else if (Array.isArray(_html)) {
        // dom list 
        var arr = _html.map(function (el) {
          return el.el ? el.el : el;
        });

        var fragment = document.createDocumentFragment();
        arr.forEach(function (el) {
          fragment.appendChild(el);
        });

        this.el.innerHTML = '';
        this.append(fragment);
      } else if ((typeof _html === 'undefined' ? 'undefined' : _typeof(_html)) === 'object') {
        // dom 
        this.append(_html);
      }

      return this;
    }
  }, {
    key: 'empty',
    value: function empty() {
      return this.html('');
    }
  }, {
    key: 'append',
    value: function append(el) {
      if (typeof el == 'string') {
        this.el.appendChild(document.createTextNode(el));
      } else {
        this.el.appendChild(el.el || el);
      }

      return this;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(target) {

      if (typeof target == 'string') {
        target = document.querySelector(target);
      }

      if (target) {

        var t = target.el ? target.el : target;
        t.appendChild(this.el);
      }

      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }

      return this;
    }
  }, {
    key: 'text',
    value: function text() {
      return this.el.textContent;
    }
  }, {
    key: 'css',
    value: function css(key, value) {
      if (arguments.length == 2) {
        this.el.style[key] = value;
      } else if (arguments.length == 1) {
        if (typeof key == 'string') {
          return getComputedStyle(this.el)[key];
        } else {
          var keys = key || {};
          for (var k in keys) {
            this.el.style[k] = keys[k];
          }
        }
      }

      return this;
    }
  }, {
    key: 'offset',
    value: function offset() {
      var rect = this.el.getBoundingClientRect();

      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    }
  }, {
    key: 'position',
    value: function position() {
      return {
        top: parseFloat(this.el.style.top),
        left: parseFloat(this.el.style.left)
      };
    }
  }, {
    key: 'width',
    value: function width() {
      return this.el.offsetWidth;
    }
  }, {
    key: 'height',
    value: function height() {
      return this.el.offsetHeight;
    }
  }, {
    key: 'dataKey',
    value: function dataKey(key) {
      return this.uniqId + '.' + (key || "");
    }
  }, {
    key: 'val',
    value: function val(value) {
      if (arguments.length == 0) {
        return this.el.value;
      } else if (arguments.length == 1) {
        this.el.value = value;
      }

      return this;
    }
  }, {
    key: 'int',
    value: function int(value) {
      if (arguments.length == 0) {
        return parseInt(this.val(), 10);
      } else {
        this.val(parseInt(value, 10));
      }

      return this;
    }
  }, {
    key: 'float',
    value: function float(value) {
      if (arguments.length == 0) {
        return parseFloat(this.val());
      } else {
        this.val(parseFloat(value));
      }

      return this;
    }
  }, {
    key: 'show',
    value: function show() {
      return this.css('display', 'block');
    }
  }, {
    key: 'hide',
    value: function hide() {
      return this.css('display', 'none');
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(eventName, callback, opt1) {
      this.el.addEventListener(eventName, callback, opt1 || false);
    }
  }, {
    key: 'on',
    value: function on(eventName, callback, opt1) {
      this.addEventListener(eventName, callback, opt1);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(eventName, callback, opt1) {
      this.el.removeEventListener(eventName, callback);
    }
  }, {
    key: 'off',
    value: function off(eventName, callback, opt1) {
      this.removeEventListener(eventName, callback, opt1);
    }
  }], [{
    key: 'trim',
    value: function trim(data) {
      return data.replace(/^\s+|\s+$/g, '');
    }
  }]);
  return Dom;
}();

var Request = function () {
  function Request(options) {
    classCallCheck(this, Request);

    this.options = options || {
      method: 'GET',
      response: function response() {}
    };
  }

  createClass(Request, [{
    key: 'send',
    value: function send() {
      var req = new XMLHttpRequest();
      if (this.options.success) {
        req.upload.addEventListener('load', this.options.success);
      }

      if (this.options.progress) {
        req.upload.addEventListener("progress", this.options.progress);
      }

      if (this.options.fail) {
        req.upload.addEventListener("error", this.options.fail);
      }

      if (this.options.abort) {
        req.upload.addEventListener("abort", this.options.abort);
      }

      req.open(this.options.method || "POST", url);

      if (this.options.responseType) {
        req.responseType = this.options.responseType;
      }

      if (this.options.headers) {
        for (var key in this.options.headers) {
          req.setRequestHeader(key, this.options.headers[key]);
        }
      }

      if (this.options.method.toUpperCase() == 'GET') {
        req.send(null);
      } else {
        var formData = this.options.formData || new FormData();

        req.send(formData);
      }
    }
  }]);
  return Request;
}();

var FileManager = function () {
  function FileManager(service, context) {
    classCallCheck(this, FileManager);

    this.service = service;
    this.context = context;
    this.options = this.service.getOptions();

    this.defaultFileName = 'summernote-file';
    this.reponseTypeFunc = this.parseResponseType(this.options.responseType);
    this.nameFunc = this.parseName(this.options.name);
    this.urlFunc = this.parseUrl(this.options.url);
    this.methodFunc = this.parseMethod(this.options.method);
    this.paramsFunc = this.parseParams(this.options.params);
    this.headersFunc = this.parseHeaders(this.options.headers);

    this.files = [];
  }

  createClass(FileManager, [{
    key: 'isFunction',
    value: function isFunction(it) {
      return typeof it === 'function';
    }
  }, {
    key: 'isString',
    value: function isString(it) {
      return typeof it === 'string';
    }
  }, {
    key: 'parseResponseType',
    value: function parseResponseType(responseType) {
      if (!responseType) return function (file, index) {};

      if (typeof responseType === 'function') {
        return function (file, i) {
          return responseType(file, i);
        };
      }

      return function (file, i) {
        return responseType || '';
      };
    }
  }, {
    key: 'parseName',
    value: function parseName(name) {
      var _this = this;

      if (!name) return function (file, index) {};
      if (typeof name === 'function') {
        return function (file, i) {
          return name(file, i);
        };
      }

      return function (file, i) {
        return name || _this.defaultFileName;
      };
    }
  }, {
    key: 'parseHeaders',
    value: function parseHeaders(headers) {
      if (!headers) return function (file, index) {};
      if (typeof headers === 'function') {
        return function (file, i) {
          return headers(file, i);
        };
      }

      return function (file, i) {
        return headers || {};
      };
    }
  }, {
    key: 'parseParams',
    value: function parseParams(params) {
      if (!params) return function (file, index) {};
      if (typeof params === 'function') {
        return function (file, i) {
          return params(file, i);
        };
      }

      return function (file, i) {
        return params || {};
      };
    }
  }, {
    key: 'parseMethod',
    value: function parseMethod(method) {
      return function (file, i) {
        return method || 'post';
      };
    }
  }, {
    key: 'parseSimpleUrl',
    value: function parseSimpleUrl(url) {
      if (!url) return function (file, index) {};
      var parser = document.createElement('a');
      parser.href = url;

      return {
        protocol: parser.protocol,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        host: parser.host
      };
    }
  }, {
    key: 'parseUrl',
    value: function parseUrl(url) {
      var _this2 = this;

      if (typeof url === 'string') {
        return function (file, i) {
          return _this2.parseSimpleUrl(url);
        };
      } else if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
        return function (file, i) {
          return url;
        };
      } else if (typeof url === 'function') {
        return function (file, i) {
          return url(file, i);
        };
      }

      return url;
    }
  }, {
    key: 'combine',
    value: function combine(file, index, callback) {
      var method = this.methodFunc(file, index);
      var responseType = this.responseTypeFunc(file, index);
      var url = this.urlFunc(file, index);
      var name = this.nameFunc(file, index);
      var params = this.paramsFunc(file, index);
      var headers = this.headersFunc(file, index);

      callback(method, name, url, params, headers, responseType);
    }
  }, {
    key: 'uploadToServer',
    value: function uploadToServer(file, index) {
      var _this3 = this;

      this.combine(file, index, function (method, name, url, params, headers, responseType) {

        var formData = new FormData();
        formData.append(name + "-index", index);
        formData.append(name, file);

        new Request({
          method: method,
          url: url,
          params: params,
          formData: formData,
          headers: headers,
          responseType: responseType,
          success: function success(res) {
            _this3.service.success(file, index);
          },
          progress: function progress(e) {
            _this3.service.progress(file, index, e.loaded, e.total);
          },
          fail: function fail(e) {
            _this3.service.fail(file, index);
          }
        }).send();
      });
    }
  }, {
    key: 'removeFile',
    value: function removeFile(index) {
      this.files.splice(index, 1);
    }
  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.files;
    }
  }, {
    key: 'addFile',
    value: function addFile(file) {
      this.files.push(file);
    }
  }, {
    key: 'addFiles',
    value: function addFiles(files) {
      var _this4 = this;

      if (!Array.isArray(files)) {
        files = [files];
      }

      files.forEach(function (file) {
        _this4.addFile(file);
      });
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(indexOrFile, index) {
      var file = indexOrFile;

      if (this.files[indexOrFile]) {
        file = this.files[indexOrFile];
      }

      this.uploadToServer(file, index);
    }
  }, {
    key: 'uploadAllFiles',
    value: function uploadAllFiles(files) {
      var _this5 = this;

      var uploadFiles = files || this.files || [];

      uploadFiles.forEach(function (file, index) {
        _this5.uploadFile(file, index);
      });
    }
  }]);
  return FileManager;
}();

var UploadPanel = function () {
  function UploadPanel(service, context /* summernote context */) {
    classCallCheck(this, UploadPanel);

    this.service = service;
    this.context = context;
    this.options = this.service.getOptions();
    this.initialize();
  }

  createClass(UploadPanel, [{
    key: 'initialize',
    value: function initialize() {

      this.$el = new Dom('div', 'upload-panel');
      this.$fileInput = new Dom('input', '', {
        type: 'file',
        multiple: true,
        placeholder: '클릭하거나 파일을 끌어다 놓습니다.',
        accept: this.options.accept || '*/*'
      });

      this.$el.append(this.$fileInput);

      this.initializeEvent();
    }
  }, {
    key: 'openFileDialog',
    value: function openFileDialog() {
      // simple file uploader 
      this.$fileInput.el.click();
    }
  }, {
    key: 'changeFileInput',
    value: function changeFileInput(e) {
      this.service.addFile([].concat(toConsumableArray(e.target.files)));
    }
  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {

      this.$$changeFileInput = this.changeFileInput.bind(this);

      this.$fileInput.addEventListener('change', this.$$changeFileInput);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(selector) {
      var el = document.querySelector(selector);

      if (el) {
        this.$el.appendTo(el);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$fileInput.removeEventListener('change', this.$$changeFileInput);
      this.$el.remove();
      this.$fileInput = null;
      this.$el = null;
    }
  }]);
  return UploadPanel;
}();

var PreviewPanel = function () {
  function PreviewPanel(service, context /* summernote context */) {
    classCallCheck(this, PreviewPanel);

    this.service = service;
    this.context = context;
    this.options = this.service.getOptions();

    this.previewClassFunc = this.parsePreviewClass(this.options.previewClass);
    this.itemClassFunc = this.parseItemClass(this.options.itemClass);
    this.itemStyleFunc = this.parseItemStyle(this.options.itemStyle);
    this.templateFunc = this.parseTemplate(this.options.template);

    this.initialize();
  }

  createClass(PreviewPanel, [{
    key: 'isFunction',
    value: function isFunction(it) {
      return typeof it === 'function';
    }
  }, {
    key: 'isString',
    value: function isString(it) {
      return typeof it === 'string';
    }
  }, {
    key: 'isObject',
    value: function isObject(it) {
      return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' && !Array.isArray(it);
    }
  }, {
    key: 'parseItemClass',
    value: function parseItemClass(itemClass) {

      if (this.isString(itemClass)) {
        return function (file, i) {
          return itemClass;
        };
      } else if (this.isFunction(itemClass)) {
        return function (file, i) {
          return itemClass(file, i); // return string 
        };
      }
    }
  }, {
    key: 'parseItemStyle',
    value: function parseItemStyle(itemStyle) {

      if (this.isFunction(itemStyle)) {
        return function (file, i) {
          return itemStyle(file, i); // return object 
        };
      } else if (this.isObject(itemStyle)) {
        return function (file, i) {
          return itemStyle;
        };
      }
    }
  }, {
    key: 'parseTemplate',
    value: function parseTemplate(template) {
      if (this.isFunction(template)) {
        return function (file, i) {
          return template(file, i); // return string or dom or domlist
        };
      } else if (this.isString(template)) {
        return function (file, i) {
          return template;
        };
      }
    }
  }, {
    key: 'parsePreviewClass',
    value: function parsePreviewClass(previewClass) {
      if (this.isString(previewClass)) {
        return function () {
          return previewClass;
        };
      } else if (this.isFunction(previewClass)) {
        return function () {
          return previewClass(); // return string 
        };
      }
    }
  }, {
    key: 'initialize',
    value: function initialize() {

      this.$el = new Dom('div', 'preview-panel');

      if (this.previewClassFunc) {
        this.$el.addClass(this.previewClassFunc());
      }

      this.initializeEvent();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.render();
    }
  }, {
    key: 'renderViewItem',
    value: function renderViewItem(file, index) {
      var $el = new Dom('div', 'view-item', {
        'data-index': index,
        'data-name': file.name,
        'data-type': file.type,
        'data-file': file
      });

      if (this.templateFunc) {
        var tpl = this.templateFunc(file, index);
        $el.html(tpl);
      }

      if (this.itemClassFunc) {
        var className = this.itemClassFunc(file, index);
        $el.addClass(className);
      }

      if (this.itemStyleFunc) {
        var styles = this.itemStyleFunc(file, index);
        $el.css(styles);
      }

      return $el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var arr = this.service.getFiles().map(function (file, index) {
        return _this.renderViewItem(file, index);
      });

      this.$el.html(arr);
    }
  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$el.remove();
      this.$el = null;
    }
  }]);
  return PreviewPanel;
}();

var UploadServicePanel = function () {
  function UploadServicePanel(uploader, context) {
    classCallCheck(this, UploadServicePanel);

    this.uploader = uploader;
    this.context = context;

    this.id = 'upload';
    this.title = "Upload";
    this.options = this.getOptions();

    this.initialize();
  }

  createClass(UploadServicePanel, [{
    key: 'getTitle',
    value: function getTitle() {
      return this.title;
    }
  }, {
    key: 'openFileDialog',
    value: function openFileDialog() {
      this.uploadPanel.openFileDialog();
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.uploader.getOptions('upload') || {};
    }
  }, {
    key: 'initialize',
    value: function initialize() {

      this.fileManager = new FileManager(this, this.context);
      this.previewPanel = new PreviewPanel(this, this.context);
      this.uploadPanel = new UploadPanel(this, this.context);

      this.$el = new Dom('div', 'summernote-upload-service-panel', {
        droppable: true
      });

      this.$el.append(this.uploadPanel.$el);
      this.$el.append(this.previewPanel.$el);

      this.initializeEvent();
    }
  }, {
    key: 'drop',
    value: function drop(e) {
      console.log('drop', e);
    }
  }, {
    key: 'dragover',
    value: function dragover(e) {
      console.log('dragover', e);
    }
  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {

      this.$$drop = this.drop.bind(this);
      this.$$dragover = this.dragover.bind(this);

      this.$el.addEventListener('drop', this.$$drop);
      this.$el.addEventListener('dragover', this.$$dragover);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      get(UploadServicePanel.prototype.__proto__ || Object.getPrototypeOf(UploadServicePanel.prototype), 'destroy', this).call(this);

      this.$el.removeEventListener('drop', this.$$drop);
      this.$el.removeEventListener('dragover', this.$$dragover);

      this.uploadPanel.destroy();
      this.previewPanel.destroy();

      this.uploadPanel = null;
      this.previewPanel = null;

      this.$el.remove();
      this.$el = null;
    }
  }, {
    key: 'addFile',
    value: function addFile(files) {

      if (!Array.isArray(files)) {
        files = [files];
      }

      this.fileManager.addFiles(files);
      this.previewPanel.refresh();
    }
  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.fileManager.getFiles();
    }

    /* upload event method  */

  }, {
    key: 'success',
    value: function success(file, index) {
      if (typeof this.options.success === 'function') {
        this.options.success(file, index);
      }
    }
  }, {
    key: 'progress',
    value: function progress(file, index, loaded, total) {
      if (typeof this.options.progress === 'function') {
        this.options.progress(file, index, loaded, total);
      }
    }
  }, {
    key: 'fail',
    value: function fail(file, index) {
      if (typeof this.options.fail === 'function') {
        this.options.fail(file, index);
      }
    }
  }, {
    key: 'abort',
    value: function abort(file, index) {
      if (typeof this.options.abort === 'function') {
        this.options.abort(file, index);
      }
    }
  }]);
  return UploadServicePanel;
}();

var DirectoryServicePanel = function () {
  function DirectoryServicePanel(uploader, context) {
    classCallCheck(this, DirectoryServicePanel);

    this.uploader = uploader;
    this.context = context;

    this.id = 'directory';
    this.title = "Directory";
    this.options = this.getOptions();

    this.initialize();
  }

  createClass(DirectoryServicePanel, [{
    key: 'getTitle',
    value: function getTitle() {
      return this.title;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.uploader.getOptions('upload') || {};
    }
  }, {
    key: 'initialize',
    value: function initialize() {

      this.$el = new Dom('div', 'summernote-directory-service-panel', {
        droppable: true
      });
    }
  }, {
    key: 'drop',
    value: function drop(e) {
      console.log('drop', e);
    }
  }, {
    key: 'dragover',
    value: function dragover(e) {
      console.log('dragover', e);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      get(DirectoryServicePanel.prototype.__proto__ || Object.getPrototypeOf(DirectoryServicePanel.prototype), 'destroy', this).call(this);

      this.$el.removeEventListener('drop', this.$$drop);
      this.$el.removeEventListener('dragover', this.$$dragover);

      this.$el.remove();
      this.$el = null;
    }
  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.fileManager.getFiles();
    }

    /* upload event method  */

  }, {
    key: 'success',
    value: function success(file, index) {
      if (typeof this.options.success === 'function') {
        this.options.success(file, index);
      }
    }
  }, {
    key: 'progress',
    value: function progress(file, index, loaded, total) {
      if (typeof this.options.progress === 'function') {
        this.options.progress(file, index, loaded, total);
      }
    }
  }, {
    key: 'fail',
    value: function fail(file, index) {
      if (typeof this.options.fail === 'function') {
        this.options.fail(file, index);
      }
    }
  }, {
    key: 'abort',
    value: function abort(file, index) {
      if (typeof this.options.abort === 'function') {
        this.options.abort(file, index);
      }
    }
  }]);
  return DirectoryServicePanel;
}();

var FileUploader = function (_SummernotePlugin) {
  inherits(FileUploader, _SummernotePlugin);

  function FileUploader(context) {
    classCallCheck(this, FileUploader);

    var _this = possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, context));

    _this.services = {};
    _this.activeService = '';
    return _this;
  }

  // new button 


  createClass(FileUploader, [{
    key: 'button.fileuploader',
    value: function buttonFileuploader() {
      var _this2 = this;

      var ui = $.summernote.ui;

      // create button
      var button = ui.button({
        contents: 'Uploader',
        tooltip: 'File Uploader',
        click: function click() {
          _this2.$back.show();
        }
      });

      // create jQuery object from button instance.
      var $hello = button.render();
      return $hello;
    }
  }, {
    key: 'getOptions',
    value: function getOptions(key) {

      var options = get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'getOptions', this).call(this, 'fileuploader');

      if (key) {
        return options[key] || {};
      }

      return options;
    }
  }, {
    key: 'addService',
    value: function addService(service, key) {
      this.services[key || service.id] = service;
    }
  }, {
    key: 'removeService',
    value: function removeService(id) {
      delete this.services[id];

      this.render();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'initialize', this).call(this);

      this.addService(new UploadServicePanel(this, this.context));
      this.addService(new DirectoryServicePanel(this, this.context));

      this.setActiveService('upload'); // upload 서비스를 처음으로 선택 
      this.initializeUI();
      this.render();

      this.initializeEvent();
    }
  }, {
    key: 'setActiveService',
    value: function setActiveService(id) {
      this.activeService = id;
    }
  }, {
    key: 'getActiveService',
    value: function getActiveService() {
      return this.services[this.activeService];
    }
  }, {
    key: 'clickSelectButton',
    value: function clickSelectButton(e) {
      this.getActiveService().select();
    }
  }, {
    key: 'clickTab',
    value: function clickTab(e) {
      var $target = new Dom(e.target);

      if ($target.hasClass('active')) {} else {
        this.setActiveService($target.attr('data-id'));
        this.reloadTab();
        this.reloadTabContents();
      }
    }
  }, {
    key: 'reloadTab',
    value: function reloadTab() {
      this.$tab.find('.active').removeClass('active');
      this.$tab.find('[data-id=' + this.activeService + ']').addClass('active');
    }
  }, {
    key: 'reloadTabContents',
    value: function reloadTabContents() {
      this.$tabContents.find('.active').removeClass('active');
      this.$tabContents.find('[data-id=' + this.activeService + ']').addClass('active');
    }
  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {
      this.$$selectFunc = this.clickSelectButton.bind(this);

      this.$select.on('click', this.$$selectFunc);

      this.$$clickTab = this.clickTab.bind(this);
      this.$tab.on('click', this.$$clickTab);
    }
  }, {
    key: 'initializeUI',
    value: function initializeUI() {

      this.$back = new Dom('div', 'summernote-fileuploader-back');

      if (this.getOptions().zIndex) {
        this.$back.css('z-index', this.getOptions().zIndex);
      }

      this.$el = new Dom('div', 'summernote-fileuploader', {
        droppable: true
      });

      this.$back.append(this.$el);

      this.$back.appendTo('body');
    }
  }, {
    key: 'render',
    value: function render() {

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
  }, {
    key: 'renderTab',
    value: function renderTab() {
      var _this3 = this;

      this.$tab.empty();

      var service = Object.keys(this.services);

      service.forEach(function (id) {
        var ServiceObject = _this3.services[id];

        var $tabItem = new Dom('div', 'tab-item', {
          'data-id': id
        }).html(ServiceObject.getTitle());

        if (id == _this3.activeService) {
          $tabItem.addClass('active');
        }

        _this3.$tab.append($tabItem);
      });
    }
  }, {
    key: 'renderTabContent',
    value: function renderTabContent() {
      var _this4 = this;

      this.$tabContents.empty();

      var service = Object.keys(this.services);

      service.forEach(function (id) {
        var ServiceObject = _this4.services[id];
        var $tabContentItem = new Dom('div', 'tab-contents-item', {
          'data-id': id
        }).html(ServiceObject.$el);

        if (id == _this4.activeService) {
          $tabContentItem.addClass('active');
        }

        _this4.$tabContents.append($tabContentItem);
      });
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      this.$footer.empty();

      this.$select = new Dom('button', 'select-button').html("Select");
      this.$footer.append(this.$select);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'destroy', this).call(this);

      this.$select.off('click', this.$$selectFunc);

      for (var key in this.services) {
        if (this.services[key]) {
          this.services[key].destroy();
        }
      }

      this.services = null;

      this.$el.remove();
      this.$el = null;
    }
  }]);
  return FileUploader;
}(SummernotePlugin);

$.extend($.summernote.plugins, {
  'fileuploader': FileUploader
});

})));
