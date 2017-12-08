// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class FileUploader {
  constructor(context) {
    this.context = context;
    this.ui = $.summernote.ui;
  }

  get events() {
    return {
      // This will be called after modules are initialized.
      'summernote.init': function (we, e) {
        console.log('summernote initialized', we, e);
      },
      // This will be called when user releases a key on editable.
      'summernote.keyup': function (we, e) {
        console.log('summernote keyup', we, e);
      }
    };
  }

  initialize() {

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

  destroy() {

    this.$panel.remove();
    this.$panel = null;
  }

  // hello button
  hello() {
    const ui = $.summernote.ui;

    // create button
    var button = ui.button({
      contents: '<i class="fa fa-child"/> Hello',
      tooltip: 'hello',
      click: function () {
        self.$panel.show();
        self.$panel.hide(500);
        // invoke insertText method with 'hello' on editor module.
        context.invoke('editor.insertText', 'hello');
      }
    });

    // create jQuery object from button instance.
    var $hello = button.render();
    return $hello;
  }
}

exports.default = FileUploader;
},{}],1:[function(require,module,exports) {
"use strict";

var _FileUploader = require("./FileUploader");

var _FileUploader2 = _interopRequireDefault(_FileUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign($.summernote.plugins, {

  'hello': function (context) {

    const uploader = new _FileUploader2.default(context);

    context.memo('button.hello', uploader.hello);

    this.events = uploader.events || {};

    this.initialize = function () {
      uploader.initialize();
    };

    this.destroy = function () {
      uploader.destroy();
    };
  }
});
},{"./FileUploader":2}]},{},[1])