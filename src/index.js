import './index.css'

import FileUploader from './component/FileUploader'

$.extend($.summernote.plugins, {
  'fileuploader': FileUploader
});
