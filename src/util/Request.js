class Request {
  constructor(options) {
    this.options = options || { 
      method : 'GET', 
      response : function () {}
    }
  }

  send () {
    var req = new XMLHttpRequest();    
    if (this.options.success) {    
      req.upload.addEventListener('load', this.options.success);
    }

    if (this.options.progress) {
      req.upload.addEventListener("progress", this.options.progress);
    }

    if (this.options.fail) {
      req.upload.addEventListener("error", this.options.fail);      
    }

    if (this.options.abort) {
      req.upload.addEventListener("abort", this.options.abort);
    }    

    req.open( this.options.method || "POST", url);

    if (this.options.responseType) {
      req.responseType = this.options.responseType;
    }

    if (this.options.headers) {
      for(let key in this.options.headers) {
        req.setRequestHeader(key, this.options.headers[key]);
      }
    }    

    if (this.options.method.toUpperCase() == 'GET') {
      req.send(null);
    } else {
      var formData = this.options.formData || new FormData();
      
      req.send(formData);
    }

  }
}

export default Request; 