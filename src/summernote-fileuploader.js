import './summernote-fileuploader.css'

import FileUploader from './component/FileUploader'

$.extend($.summernote.plugins, {
  'uploader': FileUploader
});
