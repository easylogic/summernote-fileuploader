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
      req.addEventListener('load', this.options.success);
      req.upload.addEventListener('load', this.options.success);
    }

    if (this.options.updateProgress) {
      req.addEventListener('progress', this.options.updateProgress);      
      req.upload.addEventListener("progress", this.options.updateProgress);
    }

    if (this.options.fail) {
      req.addEventListener("error", this.options.fail);
      req.upload.addEventListener("error", this.options.fail);      
    }

    if (this.options.abort) {
      req.addEventListener("abort", this.options.abort);
      req.upload.addEventListener("abort", this.options.abort);
    }    

    req.open( this.options.method || "POST", url);

    if (this.options.responseType) {
      req.responseType = this.options.responseType;
    }

    if (this.options.headers) {
      for(let key, value of this.options.headers) {
        req.setRequestHeader(key, value);
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