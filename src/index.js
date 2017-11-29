import FileUploader from './fileuploader'

(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {


  $.extend($.summernote.plugins, {
    "fileUploader" : function (context) {
      var ui = $.summernote.ui;
      
      // add elfinder button
      context.memo('button.fileUploader', function (context) {
        var options = context.options;        
        console.log(arguments);
        // create button
        var button = ui.button({
          contents: ui.icon(options.icons.align),
          click: function () {
            new FileUploader(context).open();
          }
        });

        console.log(button);
        
        // create jQuery object from button instance.
        return button.render();
      });

      console.log('init button');

      this.destroy = function () {

      }
    }
  });

}));
