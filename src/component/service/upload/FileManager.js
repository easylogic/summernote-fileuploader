import Request from '../../../util/Request'

class FileManager {
  constructor(service, context) {
    this.service = service;
    this.context = context;
    this.options = this.service.getOptions(); 

    this.defaultFileName = 'summernote-file';
    this.responseTypeFunc = this.parseResponseType(this.options.responseType);
    this.nameFunc = this.parseName(this.options.name);
    this.urlFunc = this.parseUrl(this.options.url);
    this.methodFunc = this.parseMethod(this.options.method);
    this.paramsFunc = this.parseParams(this.options.params);
    this.headersFunc = this.parseHeaders(this.options.headers);


    this.files = []; 
  }

  isFunction (it) {
    return typeof it === 'function';
  }

  isString (it) {
    return typeof it === 'string';
  }

  parseResponseType (responseType) {
    if (!responseType) return (file, index) => {} ;

    if (typeof responseType === 'function') {
      return (file, i) => {
        return responseType(file, i);
      }
    } 

    return (file, i) => {
      return responseType || '';
    };
    
  }

  parseName (name) {
    if (typeof name === 'function') {
      return (file, i) => {
        return name(file, i);
      }
    } 

    return (file, i) => {
      return file.name || name || this.defaultFileName;
    };
    
  }

  parseHeaders (headers) {
    if (!headers) return (file, index) => {} ;    
    if (typeof headers === 'function') {
      return (file, i) => {
        return headers(file, i);
      }
    } 

    return (file, i) => {
      return headers || {};
    };
    
  }

  parseParams (params) {
    if (!params) return (file, index) => {} ;    
    if (typeof params === 'function') {
      return (file, i) => {
        return params(file, i);
      }
    } 

    return (file, i) => {
      return params || {};
    };

  }

  parseMethod (method) {
    return (file, i) => {
      return method || 'post'
    };
  }

  parseSimpleUrl (url) {
    if (!url) return (file, index) => {} ;    
    var parser = document.createElement('a');
    parser.href = url;
    
    return {
      protocol : parser.protocol,
      hostname : parser.hostname,  
      port : parser.port,
      pathname : parser.pathname,
      search : parser.search,
      host : parser.host
    };
  }

  parseUrl (url) {

    if (typeof url === 'function') {
      return (file, i) => {
        return url(file, i)
      };
    } else {
      return (file, index ) => {
        return url; 
      }
    }
  }

  combine (file, index, callback) {
    const method        = this.methodFunc(file, index);    
    const responseType  = this.responseTypeFunc(file, index);        
    const url           = this.urlFunc(file, index);
    const name          = this.nameFunc(file, index);
    const params        = this.paramsFunc(file, index);
    const headers       = this.headersFunc(file, index);
    const isAsync       = this.options.isAsync || true; 
    const withCredentials   = this.options.withCredentials || false; 

    if ( !file.response ) { // 응답 받은 게 없으면 다시 보낸다. 
      callback({ 
        file, 
        index, 
        method, 
        name, 
        url, 
        params, 
        headers, 
        responseType, 
        isAsync, 
        withCredentials 
      });
    } else {
      //upload 하지 않음 . 
    }
    
  }

  uploadToServer (file, index) {

    this.combine(file, index, ({ 
      file, 
      index, 
      method, 
      name, 
      url, 
      params, 
      headers, 
      responseType, 
      isAsync, 
      withCredentials 
    }) => {

      let formData = new FormData();
      formData.append(name, file);
  
      new Request({
        method, url, params, formData, headers, responseType, isAsync, withCredentials,

        response: (obj) => {
          file.response = obj;
          this.service.response(index);
        },
        success : (res) => {
          file.success = true; 
          this.service.success(index);
        },
        progress : (e) => {
          file.progress = { loaded : e.loaded, total : e.total }
          this.service.progress(index, e.loaded, e.total);
        },
        fail : (e) => {
          file.fail = true; 
          this.service.fail(index);
        }
      }).send();
  
    })
  }

  removeFile (index) {
    this.files.splice(index, 1);
  }

  getFiles () {
    return this.files; 
  }

  getFile (index) {
    return this.files[index];
  }

  length () {
    return this.files.length; 
  }

  selectFile (index, isSelected) {
    if (this.files[index]) {
      this.files[index].selected = isSelected; 
    }
  }  

  deleteFile (index) {
    this.removeFile(index);

    // TODO:  remove uploaded file 
  }

  addFile (file) {  
    this.files.push(file);
  }

  addFiles (files) {
    if (!Array.isArray(files)) {
      files = [files];
    }

    files.forEach(file => {
      this.addFile(file);
    });
  }

  uploadFile (indexOrFile, index) {
    var file = indexOrFile;

    if (this.files[indexOrFile]) {
      file = this.files[indexOrFile];
    }

    this.uploadToServer(file, index);
  }

  uploadAllFiles (files) {
    const uploadFiles = files || this.files || [];
    
    uploadFiles.forEach((file, index) => {
      this.uploadFile(file, index);
    })
  }
}

export default FileManager;