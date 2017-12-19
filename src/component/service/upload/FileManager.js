import Request from '../../../util/Request'

class FileManager {
  constructor(uploader, context) {
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
    if (!name) return (file, index) => {} ;    
    if (typeof name === 'function') {
      return (file, i) => {
        return name(file, i);
      }
    } 

    return (file, i) => {
      return name || this.defaultFileName;
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

    if (typeof url === 'string') {
      return (file, i) => {
        return this.parseSimpleUrl(url);
      };
    } else if (typeof url === 'object') {
      return (file, i) => {
        return url;
      };
    } else if (typeof url === 'function') {
      return (file, i) => {
        return url(file, i)
      };
    }

    return url; 
  }

  combine (file, index, callback) {
    const method = this.methodFunc(file, index);    
    const responseType = this.responseTypeFunc(file, index);        
    const url = this.urlFunc(file, index);
    const name = this.nameFunc(file, index);
    const params = this.paramsFunc(file, index);
    const headers = this.headersFunc(file, index);

    callback(method, name, url, params, headers, responseType);
  }

  uploadToServer (file, index) {

    this.combine(file, index, (method, name, url, params, headers, responseType) => {

      let formData = new FormData();
      formData.append(name + "-index", index);
      formData.append(name, file);
  
      new Request({
        method: method, 
        url : url,
        params : params, 
        formData : formData,
        headers: headers, 
        responseType: responseType, 
        success : (res) => {
          this.uploader.success(file, index);
        },
        updateProgress : (e) => {
          this.uploader.updateProgress(file, index, e.loaded, e.total);
        },
        fail : (e) => {
          this.uploader.fail(file, index);
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