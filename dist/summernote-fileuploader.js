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

    this.tag = tag;
    this.className = className;
    this.attr = attr;

    this.initialize();
  }

  createClass(Dom, [{
    key: 'initialize',
    value: function initialize() {
      if (typeof this.tag != 'string') {
        this.el = this.tag;
      } else {
        var el = document.createElement(this.tag);

        this.uniqId = Counter++;

        el.className = this.className;

        var attr = this.attr || {};
        for (var k in attr) {
          el.setAttribute(k, attr[k]);
        }

        this.el = el;
      }
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
    key: 'html',
    value: function html(_html) {
      if (arguments.length == 0) {
        return this.el.innerHTML;
      }

      if (Array.isArray(_html)) {
        var arr = _html.map(function (el) {
          return el.el ? el.el : el;
        });

        var fragment = document.createDocumentFragment();
        arr.forEach(function (el) {
          fragment.appendChild(el);
        });

        this.el.innerHTML = '';
        this.el.append(fragment);
      } else {
        this.el.innerHTML = _html;
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
    key: 'removeEventListener',
    value: function removeEventListener(eventName, callback, opt1) {
      this.el.removeEventListener(eventName, callback);
    }
  }], [{
    key: 'trim',
    value: function trim(data) {
      return data.replace(/^\s+|\s+$/g, '');
    }
  }]);
  return Dom;
}();

var FileManager = function () {
  function FileManager(uploader, context) {
    classCallCheck(this, FileManager);

    this.uploader = uploader;
    this.context = context;
    this.options = this.uploader.getOptions();

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
            _this3.uploader.success(file, index);
          },
          updateProgress: function updateProgress(e) {
            _this3.uploader.updateProgress(file, index, e.loaded, e.total);
          },
          fail: function fail(e) {
            _this3.uploader.fail(file, index);
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
  function UploadPanel(uploader, context /* summernote context */) {
    classCallCheck(this, UploadPanel);

    this.uploader = uploader;
    this.context = context;
    this.options = context.options.fileuploader || {};
    this.initialize();
  }

  createClass(UploadPanel, [{
    key: 'initialize',
    value: function initialize() {

      this.$el = new Dom('div', 'summernote-fileuploader-upload-panel');
      this.$fileInput = new Dom('input', '', {
        type: 'file',
        multiple: true,
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
      this.uploader.addFile([].concat(toConsumableArray(e.target.files)));
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
  function PreviewPanel(uploader, context /* summernote context */) {
    classCallCheck(this, PreviewPanel);

    this.uploader = uploader;
    this.context = context;
    this.options = this.uploader.getOptions();

    this.renderFunc = this.parseRender(this.options.render);
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
    key: 'parseRender',
    value: function parseRender(render) {
      var result = {
        previewClass: function previewClass() {}
      };

      if (!render) return result;

      if (render.itemClass) {
        if (this.isFunction(render.itemClass)) {
          result.itemClass = function (file, i) {
            return render.itemClass;
          };
        } else if (this.isString(render.itemClass)) {
          result.itemClass = function (file, i) {
            return render.itemClass(file, i);
          };
        }
      }

      if (render.itemStyle) {
        if (this.isFunction(render.itemStyle)) {
          result.itemStyle = function (file, i) {
            return render.itemStyle(file, i);
          };
        } else {
          result.itemStyle = function (file, i) {
            return render.itemStyle;
          };
        }
      }

      if (render.template) {
        if (this.isString(render.template)) {
          result.template = function (file, i) {
            return render.template;
          };
        } else if (this.isFunction(render.template)) {
          result.template = function (file, i) {
            return render.template(file, i);
          };
        }
      }

      if (render.previewClass) {
        if (this.isString(render.previewClass)) {
          result.previewClass = function (file, i) {
            return render.previewClass;
          };
        } else if (this.isFunction(render.previewClass)) {
          result.previewClass = function (file, i) {
            return render.previewClass(file, i);
          };
        }
      }

      return result;
    }
  }, {
    key: 'initialize',
    value: function initialize() {

      this.$el = new Dom('div', 'summernote-fileuploader-preview-panel');
      this.$el.addClass(this.renderFunc.previewClass());

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

      if (this.renderFunc.template) {
        var tpl = this.renderFunc.template(file, index);
        $el.html(tpl);
      }

      if (this.renderFunc.itemClass) {
        var className = this.renderFunc.itemClass(file, index);
        $el.addClass(className);
      }

      if (this.renderFunc.itemStyle) {
        var styles = this.renderFunc.itemStyle(file, index);
        $el.css(styles);
      }

      return $el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var arr = this.uploader.getFiles().map(function (file, index) {
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

var FileUploader = function (_SummernotePlugin) {
  inherits(FileUploader, _SummernotePlugin);

  function FileUploader(context) {
    classCallCheck(this, FileUploader);
    return possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, context));
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
          _this2.$panel.show();
        }
      });

      // create jQuery object from button instance.
      var $hello = button.render();
      return $hello;
    }

    // ㅜnew button 

  }, {
    key: 'button.simple-fileuploader',
    value: function buttonSimpleFileuploader() {
      var _this3 = this;

      var ui = $.summernote.ui;

      // create button
      var button = ui.button({
        contents: 'Simple Uploader',
        tooltip: 'File Uploader',
        click: function click() {
          _this3.openFileDialog();
        }
      });

      // create jQuery object from button instance.
      var $hello = button.render();
      return $hello;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'getOptions', this).call(this, 'fileuploader');
    }
  }, {
    key: 'openFileDialog',
    value: function openFileDialog() {
      this.uploadPanel.openFileDialog();
    }
  }, {
    key: 'summernote.init',
    value: function summernoteInit(we, e) {
      console.log('summernote initalized');
    }
  }, {
    key: 'summernote.keyup',
    value: function summernoteKeyup(we, e) {
      console.log('summernote keyup', e);
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'initialize', this).call(this);

      this.previewPanel = new PreviewPanel(this, this.context);
      this.uploadPanel = new UploadPanel(this, this.context);
      this.fileManager = new FileManager(this, this.context);

      this.$panel = new Dom('div', 'summernote-fileuploader', {
        droppable: true
      });

      this.$panel.append(this.uploadPanel.$el);
      this.$panel.append(this.previewPanel.$el);

      this.$panel.appendTo('body');

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

      this.$panel.addEventListener('drop', this.$$drop);
      this.$panel.addEventListener('dragover', this.$$dragover);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), 'destroy', this).call(this);

      this.$panel.removeEventListener('drop', this.$$drop);
      this.$panel.removeEventListener('dragover', this.$$dragover);

      this.uploadPanel.destroy();
      this.previewPanel.destroy();

      this.uploadPanel = null;
      this.previewPanel = null;

      this.$panel.remove();
      this.$panel = null;
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

    /* upload util method  */

  }, {
    key: 'upload',
    value: function upload(file, target) {}
  }]);
  return FileUploader;
}(SummernotePlugin);

$.extend($.summernote.plugins, {
  'fileuploader': FileUploader
});

})));
