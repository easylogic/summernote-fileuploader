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
})({4:[function(require,module,exports) {

},{}],5:[function(require,module,exports) {
"use strict";

var _createClass = function () { function a(a, b) { for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c); } return function (b, c, d) { return c && a(b.prototype, c), d && a(b, d), b; }; }();

Object.defineProperty(exports, "__esModule", {
  value: !0
});

function _classCallCheck(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function"); }

var SummernotePlugin = function () {
  function a(b) {
    _classCallCheck(this, a), this.context = b, this.events = {}, this.initializeSummernoteResources();
  }

  return _createClass(a, [{
    key: "filterProps",
    value: function filterProps(a) {
      return Object.getOwnPropertyNames(this.__proto__).filter(function (b) {
        return b.includes(a);
      });
    }
  }, {
    key: "initializeSummernoteResources",
    value: function initializeSummernoteResources() {
      var a = this;
      this.filterProps('button.').forEach(function (b) {
        a.context.memo(b, a[b].bind(a));
      }), this.filterProps('summernote.').forEach(function (b) {
        a.events[b] = a[b].bind(a);
      });
    }
  }, {
    key: "invoke",
    value: function invoke() {
      this.context.invoke.apply(this.context, [].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "initialize",
    value: function initialize() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]), a;
}();

exports.default = SummernotePlugin;
},{}],2:[function(require,module,exports) {
"use strict";

var _createClass = function () { function a(a, b) { for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c); } return function (b, c, d) { return c && a(b.prototype, c), d && a(b, d), b; }; }(),
    _get = function a(b, c, d) { null === b && (b = Function.prototype); var e = Object.getOwnPropertyDescriptor(b, c); if (e === void 0) { var f = Object.getPrototypeOf(b); return null === f ? void 0 : a(f, c, d); } if ("value" in e) return e.value; var g = e.get; return void 0 === g ? void 0 : g.call(d); };

Object.defineProperty(exports, "__esModule", {
  value: !0
});
require("./summernote-fileuploader.css"), require("./template/uploader.html");

var _SummernotePlugin2 = require("./SummernotePlugin"),
    _SummernotePlugin3 = _interopRequireDefault(_SummernotePlugin2);

function _interopRequireDefault(a) { return a && a.__esModule ? a : { default: a }; }

function _classCallCheck(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function"); }

function _possibleConstructorReturn(a, b) { if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return b && ("object" == typeof b || "function" == typeof b) ? b : a; }

function _inherits(a, b) { if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b); a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b); }

console.log(uploadPanel);

var FileUploader = function (a) {
  function b(a) {
    return _classCallCheck(this, b), _possibleConstructorReturn(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, a));
  }

  // ㅜnew button 


  return _inherits(b, a), _createClass(b, [{
    key: 'button.hello',
    value: function buttonHello() {
      var a = this,
          b = $.summernote.ui,
          c = b.button({
        contents: 'Uploader',
        tooltip: 'File Uploader',
        click: function click() {
          a.$panel.show(), a.$panel.hide(500), a.invoke('editor.insertText', 'hello');
        }
      }),
          d = c.render();

      // create button


      // create jQuery object from button instance.

      return d;
    }
  }, {
    key: 'summernote.init',
    value: function summernoteInit() {
      console.log('summernote initalized');
    }
  }, {
    key: 'summernote.keyup',
    value: function summernoteKeyup(a, b) {
      console.log('summernote keyup', b);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      _get(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "initialize", this).call(this), this.$panel = $('<div class="summernote-fileuploader" />').html(uploadPanel), this.$panel.prependTo('body');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "destroy", this).call(this), this.$panel.remove(), this.$panel = null;
    }

    /* upload util method  */

  }, {
    key: "upload",
    value: function upload() {}
  }]), b;
}(_SummernotePlugin3.default);

exports.default = FileUploader;
},{"./summernote-fileuploader.css":4,"./SummernotePlugin":5,"./template/uploader.html":6}],1:[function(require,module,exports) {
"use strict";

var _FileUploader = require("./FileUploader"),
    _FileUploader2 = _interopRequireDefault(_FileUploader);

function _interopRequireDefault(a) { return a && a.__esModule ? a : { default: a }; }

$.extend($.summernote.plugins, {
  uploader: _FileUploader2.default
});
},{"./FileUploader":2}]},{},[1])