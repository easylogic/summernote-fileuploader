!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";var e=function(e,t,i){e.addEventListener(t,i)},t=function(e,t,i){e.removeEventListener(t,i)},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function e(t,i,n){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,n)}if("value"in s)return s.value;var r=s.get;if(void 0!==r)return r.call(n)},r=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},l=function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)},u=0,c=[],h=function(){function e(t,i,s){if(n(this,e),"string"!=typeof t)this.el=t;else{var o=document.createElement(t);this.uniqId=u++,i&&(o.className=i),s=s||{};for(var r in s)o.setAttribute(r,s[r]);this.el=o}}return s(e,[{key:"attr",value:function(e,t){return 1==arguments.length?this.el.getAttribute(e):(this.el.setAttribute(e,t),this)}},{key:"closest",value:function(t){for(var i=this,n=!1;!(n=i.hasClass(t));){if(!i.el.parentNode)return null;i=new e(i.el.parentNode)}return n?i:null}},{key:"removeClass",value:function(e){this.el.className=(" "+this.el.className+" ").replace(" "+e+" "," ").trim()}},{key:"hasClass",value:function(e){if(this.el.className){return(" "+this.el.className+" ").indexOf(" "+e+" ")>-1}return!1}},{key:"addClass",value:function(e){return this.hasClass(e)||(this.el.className=this.el.className+" "+e),this}},{key:"toggleClass",value:function(e){return this.hasClass(e)?this.removeClass(e):this.addClass(e),this}},{key:"find",value:function(t){return new e(this.el.querySelector(t))}},{key:"findAll",value:function(t){return[].concat(l(this.el.querySelectorAll(t))).map(function(t){return new e(t)})}},{key:"html",value:function(e){if(0==arguments.length)return this.el.innerHTML;if("string"==typeof e)this.el.innerHTML=e;else if(Array.isArray(e)){var t=e.map(function(e){return e.el?e.el:e}),n=document.createDocumentFragment();t.forEach(function(e){n.appendChild(e)}),this.el.innerHTML="",this.append(n)}else"object"===(void 0===e?"undefined":i(e))&&this.append(e);return this}},{key:"empty",value:function(){return this.html("")}},{key:"after",value:function(e){return"string"==typeof e?this.el.parentNode.insertBefore(document.createTextNode(e),this.el.nextSibling):this.el.parentNode.insertBefore(e.el||e,this.el.nextSibling),this}},{key:"before",value:function(){return"string"==typeof el?this.el.parentNode.insertBefore(document.createTextNode(el),this.el):this.el.parentNode.insertBefore(el.el||el,this.el),this}},{key:"append",value:function(e){return"string"==typeof e?this.el.appendChild(document.createTextNode(e)):this.el.appendChild(e.el||e),this}},{key:"appendTo",value:function(e){if("string"==typeof e&&(e=document.querySelector(e)),e){(e.el?e.el:e).appendChild(this.el)}return this}},{key:"parent",value:function(){return this.el.parentNode?new e(this.el.parentNode):null}},{key:"remove",value:function(){return this.el.parentNode&&this.el.parentNode.removeChild(this.el),this}},{key:"text",value:function(){return this.el.textContent}},{key:"css",value:function(e,t){if(2==arguments.length)this.el.style[e]=t;else if(1==arguments.length){if("string"==typeof e)return getComputedStyle(this.el)[e];var i=e||{};for(var n in i)this.el.style[n]=i[n]}return this}},{key:"offset",value:function(){var e=this.el.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}}},{key:"position",value:function(){return{top:parseFloat(this.el.style.top),left:parseFloat(this.el.style.left)}}},{key:"width",value:function(){return this.el.offsetWidth}},{key:"height",value:function(){return this.el.offsetHeight}},{key:"dataKey",value:function(e){return this.uniqId+"."+e}},{key:"data",value:function(e,t){if(2!=arguments.length){if(1==arguments.length)return c[this.dataKey(e)];var i=Object.keys(c),n=this.uniqId+".";return i.filter(function(e){return 0==e.indexOf(n)}).map(function(e){return c[e]})}return c[this.dataKey(e)]=t,this}},{key:"val",value:function(e){return 0==arguments.length?this.el.value:(1==arguments.length&&(this.el.value=e),this)}},{key:"int",value:function(e){return 0==arguments.length?parseInt(this.val(),10):(this.val(parseInt(e,10)),this)}},{key:"float",value:function(e){return 0==arguments.length?parseFloat(this.val()):(this.val(parseFloat(e)),this)}},{key:"show",value:function(){return this.css("display","block")}},{key:"hide",value:function(){return this.css("display","none")}},{key:"toggle",value:function(){return"none"==this.css("display")?this.show():this.hide()}},{key:"on",value:function(e,t,i,n){return this.el.addEventListener(e,t,i,n),this}},{key:"off",value:function(e,t){return this.el.removeEventListener(e,t),this}},{key:"getElement",value:function(){return this.el}},{key:"createChild",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=new e(t,i,n);return o.css(s),this.append(o),o}}]),e}(),f=/^(click|mouse(down|up|move|enter|leave)|key(down|up|press)|contextmenu|change|input)/gi,p=["Control","Shift","Alt","Meta"],d=function(){function i(){n(this,i)}return s(i,[{key:"initializeEvent",value:function(){this.initializeEventMachin()}},{key:"destroy",value:function(){this.destroyEventMachin()}},{key:"destroyEventMachin",value:function(){this.removeEventAll()}},{key:"initializeEventMachin",value:function(){this.filterProps(f).forEach(this.parseEvent.bind(this))}},{key:"filterProps",value:function(e){return Object.getOwnPropertyNames(this.__proto__).filter(function(t){return t.match(e)})}},{key:"parseEvent",value:function(e){var t=e.split(" ");this.bindingEvent(t,this[e].bind(this))}},{key:"getDefaultDomElement",value:function(e){var t=void 0;return(t=e?this[e]||window[e]:this.el||this.$el||this.$root)instanceof h?t.getElement():t}},{key:"getDefaultEventObject",value:function(e){var t=this,i=e.split("."),n=i.shift(),s=i.includes("Control"),o=i.includes("Shift"),r=i.includes("Alt"),a=i.includes("Meta"),l=(i=i.filter(function(e){return!1===p.includes(e)})).filter(function(e){return!!t[e]});return i=i.filter(function(e){return!1===l.includes(e)}).map(function(e){return e.toLowerCase()}),{eventName:n,isControl:s,isShift:o,isAlt:r,isMeta:a,codes:i,checkMethodList:l}}},{key:"bindingEvent",value:function(e,t){var i=function(e){return Array.isArray(e)?e:Array.from(e)}(e),n=i[0],s=i[1],o=i.slice(2);s=this.getDefaultDomElement(s);var r=this.getDefaultEventObject(n);r.dom=s,r.delegate=o.join(" "),this.addEvent(r,t)}},{key:"matchPath",value:function(e,t){return e?e.matches(t)?e:this.matchPath(e.parentElement,t):null}},{key:"getBindings",value:function(){return this._bindings||this.initBindings(),this._bindings}},{key:"addBinding",value:function(e){this.getBindings().push(e)}},{key:"initBindings",value:function(){this._bindings=[]}},{key:"checkEventType",value:function(e,t){var i=this,n=!e.ctrlKey||t.isControl,s=!e.shiftKey||t.isShift,o=!e.altKey||t.isAlt,r=!e.metaKey||t.isMeta,a=!0;t.codes.length&&(a=t.codes.includes(e.code.toLowerCase())||t.codes.includes(e.key.toLowerCase()));var l=!0;return t.checkMethodList.length&&(l=t.checkMethodList.every(function(t){return i[t].call(i,e)})),n&&o&&s&&r&&a&&l}},{key:"makeCallback",value:function(e,t){var i=this;return e.delegate?function(n){if(i.checkEventType(n,e)){var s=i.matchPath(n.target||n.srcElement,e.delegate);if(s)return n.delegateTarget=s,n.$delegateTarget=new h(s),t(n)}}:function(n){if(i.checkEventType(n,e))return t(n)}}},{key:"addEvent",value:function(t,i){t.callback=this.makeCallback(t,i),this.addBinding(t),e(t.dom,t.eventName,t.callback)}},{key:"removeEventAll",value:function(){var e=this;this.getBindings().forEach(function(t){e.removeEvent(t)}),this.initBindings()}},{key:"removeEvent",value:function(e){var i=e.eventName,n=e.dom,s=e.callback;t(n,i,s)}}]),i}(),v=function(e){function t(e){n(this,t);var i=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.context=e,i.events={},i.initializeSummernoteResources(),i}return r(t,d),s(t,[{key:"getOptions",value:function(e){return this.context.options[e]||{}}},{key:"initializeSummernoteResources",value:function(){var e=this;this.filterProps("button.").forEach(function(t){e.context.memo(t,e[t].bind(e))}),this.filterProps("summernote.").forEach(function(t){e.events[t]=e[t].bind(e)})}},{key:"invoke",value:function(){this.context.invoke.apply(this.context,[].concat(Array.prototype.slice.call(arguments)))}},{key:"initialize",value:function(){o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initializeEvent",this).call(this)}},{key:"destroy",value:function(){o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this)}}]),t}(),y=function(){function e(t){n(this,e),this.options=t||{method:"GET",response:function(){}}}return s(e,[{key:"send",value:function(){var e=this,t=new XMLHttpRequest;if(t.withCredentials=this.options.withCredentials||!1,t.onreadystatechange=function(){try{4===t.readyState&&(200===t.status?e.options.response({success:!0,req:t}):e.options.response({success:!1}))}catch(e){console.error(e)}},this.options.success&&t.upload.addEventListener("load",this.options.success),this.options.progress&&t.upload.addEventListener("progress",this.options.progress),this.options.fail&&t.upload.addEventListener("error",this.options.fail),this.options.abort&&t.upload.addEventListener("abort",this.options.abort),t.open(this.options.method||"POST",this.options.url,this.options.isAsync||!0),this.options.responseType&&(t.responseType=this.options.responseType),this.options.headers)for(var i in this.options.headers)t.setRequestHeader(i,this.options.headers[i]);if(t.setRequestHeader("Content-Type","text/html"),"GET"==this.options.method.toUpperCase())t.send(null);else{var n=this.options.formData||new FormData;t.send(n)}}}]),e}(),m=function(){function e(t,i){n(this,e),this.service=t,this.context=i,this.options=this.service.getOptions(),this.defaultFileName="summernote-file",this.responseTypeFunc=this.parseResponseType(this.options.responseType),this.nameFunc=this.parseName(this.options.name),this.urlFunc=this.parseUrl(this.options.url),this.methodFunc=this.parseMethod(this.options.method),this.paramsFunc=this.parseParams(this.options.params),this.headersFunc=this.parseHeaders(this.options.headers),this.files=[]}return s(e,[{key:"isFunction",value:function(e){return"function"==typeof e}},{key:"isString",value:function(e){return"string"==typeof e}},{key:"parseResponseType",value:function(e){return e?"function"==typeof e?function(t,i){return e(t,i)}:function(t,i){return e||""}:function(e,t){}}},{key:"parseName",value:function(e){var t=this;return"function"==typeof e?function(t,i){return e(t,i)}:function(i,n){return i.name||e||t.defaultFileName}}},{key:"parseHeaders",value:function(e){return e?"function"==typeof e?function(t,i){return e(t,i)}:function(t,i){return e||{}}:function(e,t){}}},{key:"parseParams",value:function(e){return e?"function"==typeof e?function(t,i){return e(t,i)}:function(t,i){return e||{}}:function(e,t){}}},{key:"parseMethod",value:function(e){return function(t,i){return e||"post"}}},{key:"parseSimpleUrl",value:function(e){if(!e)return function(e,t){};var t=document.createElement("a");return t.href=e,{protocol:t.protocol,hostname:t.hostname,port:t.port,pathname:t.pathname,search:t.search,host:t.host}}},{key:"parseUrl",value:function(e){return"function"==typeof e?function(t,i){return e(t,i)}:function(t,i){return e}}},{key:"combine",value:function(e,t,i){var n=this.methodFunc(e,t),s=this.responseTypeFunc(e,t),o=this.urlFunc(e,t),r=this.nameFunc(e,t),a=this.paramsFunc(e,t),l=this.headersFunc(e,t),u=this.options.isAsync||!0,c=this.options.withCredentials||!1;e.response||i({file:e,index:t,method:n,name:r,url:o,params:a,headers:l,responseType:s,isAsync:u,withCredentials:c})}},{key:"uploadToServer",value:function(e,t){var i=this;this.combine(e,t,function(e){var t=e.file,n=e.index,s=e.method,o=e.name,r=e.url,a=e.params,l=e.headers,u=e.responseType,c=e.isAsync,h=e.withCredentials,f=new FormData;f.append(o,t),new y({method:s,url:r,params:a,formData:f,headers:l,responseType:u,isAsync:c,withCredentials:h,response:function(e){t.response=e,i.service.response(n)},success:function(e){t.success=!0,i.service.success(n)},progress:function(e){t.progress={loaded:e.loaded,total:e.total},i.service.progress(n,e.loaded,e.total)},fail:function(e){t.fail=!0,i.service.fail(n)}}).send()})}},{key:"removeFile",value:function(e){this.files.splice(e,1)}},{key:"getFiles",value:function(){return this.files}},{key:"getFile",value:function(e){return this.files[e]}},{key:"length",value:function(){return this.files.length}},{key:"selectFile",value:function(e,t){this.files[e]&&(this.files[e].selected=t)}},{key:"deleteFile",value:function(e){this.removeFile(e)}},{key:"addFile",value:function(e){this.files.push(e)}},{key:"addFiles",value:function(e){var t=this;Array.isArray(e)||(e=[e]),e.forEach(function(e){t.addFile(e)})}},{key:"uploadFile",value:function(e,t){var i=e;this.files[e]&&(i=this.files[e]),this.uploadToServer(i,t)}},{key:"uploadAllFiles",value:function(e){var t=this;(e||this.files||[]).forEach(function(e,i){t.uploadFile(e,i)})}}]),e}(),g=function(e){function t(e,i){n(this,t);var s=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return s.service=e,s.context=i,s.options=s.service.getOptions(),s.initialize(),s}return r(t,v),s(t,[{key:"initialize",value:function(){this.$el=new h("div","upload-panel"),this.$fileInput=new h("input","",{type:"file",multiple:!0,placeholder:"Attach files by dragging & dropping, selecting them, or pasting from the clipboard.",accept:this.options.accept||"*/*"}),this.$el.append(this.$fileInput),o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initialize",this).call(this)}},{key:"openFileDialog",value:function(){this.$fileInput.el.click()}},{key:"change $fileInput",value:function(e){this.service.addFile([].concat(l(e.target.files)))}},{key:"appendTo",value:function(e){var t=document.querySelector(e);t&&this.$el.appendTo(t)}},{key:"destroy",value:function(){this.$el.remove(),this.$fileInput=null,this.$el=null}}]),t}(),k={round:function(e,t){var i=Math.pow(10,t);return Math.floor(e*i)/i},filesize:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e>=1073741824?this.round(e/1073741824,t)+" GB":e>=1048576?this.round(e/1048576,t)+" MB":e>=1024?this.round(e/1024,t)+" KB":e+" B"},filetype:function(e){return e.includes("image")?"I":e.includes("text")?"T":e.includes("application")?"A":"E"}},b=function(e){function t(e,i){n(this,t);var s=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return s.service=e,s.context=i,s.options=s.service.getOptions(),s.previewClassFunc=s.parsePreviewClass(s.options.previewClass),s.itemClassFunc=s.parseItemClass(s.options.itemClass),s.itemStyleFunc=s.parseItemStyle(s.options.itemStyle),s.templateFunc=s.parseTemplate(s.options.template),s.initialize(),s}return r(t,v),s(t,[{key:"isFunction",value:function(e){return"function"==typeof e}},{key:"isString",value:function(e){return"string"==typeof e}},{key:"isObject",value:function(e){return"object"===(void 0===e?"undefined":i(e))&&!Array.isArray(e)}},{key:"parseItemClass",value:function(e){return this.isString(e)?function(t,i){return e}:this.isFunction(e)?function(t,i){return e(t,i)}:void 0}},{key:"parseItemStyle",value:function(e){return this.isFunction(e)?function(t,i){return e(t,i)}:this.isObject(e)?function(t,i){return e}:void 0}},{key:"parseTemplate",value:function(e){return this.isFunction(e)?function(t,i){return e(t,i)}:this.isString(e)?function(t,i){return e}:void 0}},{key:"parsePreviewClass",value:function(e){return this.isString(e)?function(){return e}:this.isFunction(e)?function(){return e()}:void 0}},{key:"initialize",value:function(){this.$el=new h("div","preview-panel"),this.previewClassFunc&&this.$el.addClass(this.previewClassFunc()),o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initialize",this).call(this)}},{key:"refresh",value:function(){this.render()}},{key:"getFileSize",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return k.filesize(e,t)}},{key:"getFileType",value:function(e){return k.filetype(e)}},{key:"getFileExt",value:function(e){return e.split(".").pop()}},{key:"updateProgress",value:function(e,t){var i=this.$el.find("[data-index='"+e+"']").find(".file-progress-bar");i&&i.css("width",t+"%")}},{key:"templateItem",value:function(e,t){var i="about:blank",n=e.name,s=this.getFileSize(e.size),o=this.getFileExt(e.name);e.type.indexOf("image")>-1&&(i=URL.createObjectURL(e));return'\n    <div class="item-close"> <span>&times;</span> </div>    \n      '+("about:blank"==i?"<div class='preview-image "+"empty"+"' data-file-ext='"+o+"' ></div> ":'<img src="'+i+"\" class='preview-image' data-file-ext='"+o+"' /> ")+'\n\n      <div class="file-info" >\n        <div class="file-name" title="'+n+'" >\n          '+n+'\n        </div>\n        <div class="file-size" >'+s+'</div>\n      </div>\n      <div class="file-progress"><div class="file-progress-bar"></div></div>\n    '}},{key:"refreshItemStatus",value:function(e,t){this.$el.find("[data-index='"+e+"']").addClass(t)}},{key:"renderViewItem",value:function(e){var t=this.service.getFile(e),i=new h("div","view-item",{"data-index":e,"data-name":t.name,"data-type":t.type,"data-size":t.size});if(t.selected&&i.addClass("selected"),t.success&&i.addClass("success"),t.fail&&i.addClass("fail"),this.templateFunc){var n=this.templateFunc(t,e);i.html(n)}else{var s=this.templateItem(t,e);i.html(s)}if(this.itemClassFunc){var o=this.itemClassFunc(t,e);i.addClass(o)}if(this.itemStyleFunc){var r=this.itemStyleFunc(t,e);i.css(r)}return i}},{key:"render",value:function(){for(var e=this.service.length(),t=[],i=0;i<e;i++)t[i]=this.renderViewItem(i);this.$el.html(t)}},{key:"click $el .item-close",value:function(e){e.preventDefault();var t=e.$delegateTarget.closest("view-item");t&&(this.service.deleteFile(t.attr("data-index")),t.remove())}},{key:"click $el .view-item",value:function(e){e.preventDefault();var t=e.$delegateTarget;t&&(t.toggleClass("selected"),this.service.selectFile(t.attr("data-index"),t.hasClass("selected")))}},{key:"destroy",value:function(){this.$el.remove(),this.$el=null}},{key:"response",value:function(e){}},{key:"success",value:function(e){this.refreshItemStatus(e,"success")}},{key:"progress",value:function(e,t,i){this.updateProgress(e,t/i*100)}},{key:"fail",value:function(e){this.refreshItemStatus(e,"fail")}},{key:"abort",value:function(e){}}]),t}(),F=function(e){function t(e,i){n(this,t);var s=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return s.uploader=e,s.context=i,s.id="upload",s.title="Upload",s.options=s.getOptions(),s.initialize(),s}return r(t,v),s(t,[{key:"getTitle",value:function(){return this.title}},{key:"openFileDialog",value:function(){this.uploadPanel.openFileDialog()}},{key:"getOptions",value:function(){return this.uploader.getOptions("upload")||{}}},{key:"initialize",value:function(){this.fileManager=new m(this,this.context),this.previewPanel=new b(this,this.context),this.uploadPanel=new g(this,this.context),this.$el=new h("div","summernote-upload-service-panel",{droppable:!0}),this.$el.append(this.uploadPanel.$el),this.$el.append(this.previewPanel.$el),this.initializeFileEvent(),o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initialize",this).call(this)}},{key:"drop",value:function(e){e.preventDefault(),this.addFile([].concat(l(e.dataTransfer.files)))}},{key:"dragover",value:function(e){e.preventDefault()}},{key:"initializeFileEvent",value:function(){var e=this;["response","success","progress","fail","abort"].forEach(function(t){e[t]=function(i,n,s){"function"==typeof e.options[t]&&e.options[t](e.getFile(i),i,n,s),"function"==typeof e.previewPanel[t]&&e.previewPanel[t](i,n,s)}})}},{key:"destroy",value:function(){o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this),this.uploadPanel.destroy(),this.previewPanel.destroy(),this.uploadPanel=null,this.previewPanel=null,this.$el.remove(),this.$el=null}},{key:"addFile",value:function(e){Array.isArray(e)||(e=[e]),this.fileManager.addFiles(e),this.previewPanel.refresh(),this.fileManager.uploadAllFiles()}},{key:"length",value:function(){return this.fileManager.length()}},{key:"getFiles",value:function(){return this.fileManager.getFiles()}},{key:"getFile",value:function(e){return this.fileManager.getFile(e)}},{key:"selectFile",value:function(e,t){this.fileManager.selectFile(e,t)}},{key:"deleteFile",value:function(e){this.fileManager.deleteFile(e)}}]),t}(),w=function(e){function t(e,i){n(this,t);var s=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return s.uploader=e,s.context=i,s.id="directory",s.title="Directory",s.options=s.getOptions(),s.initialize(),s}return r(t,v),s(t,[{key:"getTitle",value:function(){return this.title}},{key:"getOptions",value:function(){return this.uploader.getOptions("upload")||{}}},{key:"initialize",value:function(){this.$el=new h("div","summernote-directory-service-panel",{droppable:!0}),o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initialize",this).call(this)}},{key:"drop",value:function(e){console.log("drop",e)}},{key:"dragover",value:function(e){console.log("dragover",e)}},{key:"destroy",value:function(){o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this),this.$el.removeEventListener("drop",this.$$drop),this.$el.removeEventListener("dragover",this.$$dragover),this.$el.remove(),this.$el=null}},{key:"getFiles",value:function(){return this.fileManager.getFiles()}},{key:"success",value:function(e,t){"function"==typeof this.options.success&&this.options.success(e,t)}},{key:"progress",value:function(e,t,i,n){"function"==typeof this.options.progress&&this.options.progress(e,t,i,n)}},{key:"fail",value:function(e,t){"function"==typeof this.options.fail&&this.options.fail(e,t)}},{key:"abort",value:function(e,t){"function"==typeof this.options.abort&&this.options.abort(e,t)}}]),t}(),_=function(e){function t(e){n(this,t);var i=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.services={},i.activeService="",i.addService(new F(i,i.context)),i.addService(new w(i,i.context)),i.setActiveService("upload"),i.initializeUI(),i.render(),i}return r(t,v),s(t,[{key:"button.fileuploader",value:function(){var e=this;return $.summernote.ui.button({contents:"Uploader",tooltip:"File Uploader",click:function(){e.show()}}).render()}},{key:"getOptions",value:function(e){var i=o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"getOptions",this).call(this,"fileuploader");return e?i[e]||{}:i}},{key:"addService",value:function(e,t){this.services[t||e.id]=e}},{key:"removeService",value:function(e){delete this.services[e],this.render()}},{key:"setActiveService",value:function(e){this.activeService=e}},{key:"getActiveService",value:function(){return this.services[this.activeService]}},{key:"reloadTab",value:function(){this.$tab.find(".active").removeClass("active"),this.$tab.find("[data-id="+this.activeService+"]").addClass("active")}},{key:"reloadTabContents",value:function(){this.$tabContents.find(".active").removeClass("active"),this.$tabContents.find("[data-id="+this.activeService+"]").addClass("active")}},{key:"click $cancel",value:function(e){this.hide()}},{key:"click $select",value:function(e){this.getActiveService().select()}},{key:"click $tab .tab-item",value:function(e){var t=e.$delegateTarget;t.hasClass("active")||(this.setActiveService(t.attr("data-id")),this.reloadTab(),this.reloadTabContents())}},{key:"initializeUI",value:function(){this.$back=new h("div","fileuploader-back"),this.getOptions().zIndex&&this.$back.css("z-index",this.getOptions().zIndex),this.$el=new h("div","fileuploader",{droppable:!0}),this.$back.append(this.$el),this.$back.appendTo("body")}},{key:"show",value:function(){this.$back.show()}},{key:"hide",value:function(){this.$back.hide()}},{key:"toggle",value:function(){this.$back.toggle()}},{key:"render",value:function(){this.$el.empty(),this.$tab=new h("div","tabs"),this.$tabContents=new h("div","tab-contents"),this.$footer=new h("div","footer"),this.$el.append(this.$tab),this.$el.append(this.$tabContents),this.$el.append(this.$footer),this.renderTab(),this.renderTabContent(),this.renderFooter()}},{key:"renderTab",value:function(){var e=this;this.$tab.empty();Object.keys(this.services).forEach(function(t){var i=e.services[t],n=new h("div","tab-item",{"data-id":t}).html(i.getTitle());t==e.activeService&&n.addClass("active"),e.$tab.append(n)})}},{key:"renderTabContent",value:function(){var e=this;this.$tabContents.empty();Object.keys(this.services).forEach(function(t){var i=e.services[t],n=new h("div","tab-contents-item",{"data-id":t}).html(i.$el);t==e.activeService&&n.addClass("active"),e.$tabContents.append(n)})}},{key:"renderFooter",value:function(){this.$footer.empty(),this.$cancel=new h("button","cancel-button").html("Close"),this.$select=new h("button","select-button").html("Select"),this.$footer.append(this.$cancel),this.$footer.append(this.$select)}},{key:"destroy",value:function(){o(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this);for(var e in this.services)this.services[e]&&this.services[e].destroy();this.services=null,this.$el.remove(),this.$el=null}}]),t}();$.extend($.summernote.plugins,{fileuploader:_})});
