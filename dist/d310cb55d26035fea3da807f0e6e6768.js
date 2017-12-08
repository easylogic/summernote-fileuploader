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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SummernotePlugin = function () {
  function SummernotePlugin(context) {
    _classCallCheck(this, SummernotePlugin);

    this.context = context;
    this.events = {};
    this.initializeSummernoteResources();
  }

  _createClass(SummernotePlugin, [{
    key: "filterProps",
    value: function filterProps(pattern) {
      return Object.getOwnPropertyNames(this.__proto__).filter(function (key) {
        return key.includes(pattern);
      });
    }
  }, {
    key: "initializeSummernoteResources",
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
  }]);

  return SummernotePlugin;
}();

exports.default = SummernotePlugin;
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SummernotePlugin2 = require("./SummernotePlugin");

var _SummernotePlugin3 = _interopRequireDefault(_SummernotePlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploader = function (_SummernotePlugin) {
  _inherits(FileUploader, _SummernotePlugin);

  function FileUploader(context) {
    _classCallCheck(this, FileUploader);

    return _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, context));
  }

  // ㅜnew button 


  _createClass(FileUploader, [{
    key: 'button.hello',
    value: function buttonHello() {
      var _this2 = this;

      var ui = $.summernote.ui;

      // create button
      var button = ui.button({
        contents: 'Uploader',
        tooltip: 'File Uploader',
        click: function click() {
          _this2.$panel.show();
          _this2.$panel.hide(500);
          // invoke insertText method with 'hello' on editor module.
          _this2.invoke('editor.insertText', 'hello');
        }
      });

      // create jQuery object from button instance.
      var $hello = button.render();
      return $hello;
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
    key: "initialize",
    value: function initialize() {
      _get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), "initialize", this).call(this);

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
  }, {
    key: "destroy",
    value: function destroy() {
      _get(FileUploader.prototype.__proto__ || Object.getPrototypeOf(FileUploader.prototype), "destroy", this).call(this);

      this.$panel.remove();
      this.$panel = null;
    }

    /* upload util method  */

  }, {
    key: "upload",
    value: function upload(file, target) {}
  }]);

  return FileUploader;
}(_SummernotePlugin3.default);

exports.default = FileUploader;
},{"./SummernotePlugin":4}],2:[function(require,module,exports) {
"use strict";

var _FileUploader = require("./FileUploader");

var _FileUploader2 = _interopRequireDefault(_FileUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$.extend($.summernote.plugins, {
  'uploader': _FileUploader2.default
});
},{"./FileUploader":3}],0:[function(require,module,exports) {
var global = (1,eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:65014/');
  ws.onmessage = (e) => {
    var data = JSON.parse(e.data);

    if (data.type === 'update') {
      for (let asset of data.assets) {
        hmrApply(global.require, asset);
      }

      for (let asset of data.assets) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      }
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  let parents = [];
  for (let k in modules) {
    for (let d in modules[k][1]) {
      let dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    let fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  let cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(id => hmrAccept(global.require, id));
}
},{}]},{},[0,2])