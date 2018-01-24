class Request {
  constructor(options) {
    this.options = options || { 
      method : 'GET', 
      response : function () {}
    }
  }

  send () {
    var req = new XMLHttpRequest();    

    req.withCredentials = this.options.withCredentials || false;

    req.onreadystatechange =  () => {
      try {
        if (req.readyState === 4) {
          if (req.status === 200) {
            this.options.response({ success : true, req })
          } else {
            this.options.response({ success : false  })
          }
        }
      } catch (e) {
        console.error(e);
      }

    }
    

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

    req.open( this.options.method || "POST", this.options.url, this.options.isAsync || true);

    if (this.options.responseType) {
      req.responseType = this.options.responseType;
    }

    if (this.options.headers) {
      for(let key in this.options.headers) {
        req.setRequestHeader(key, this.options.headers[key]);
      }
    }    

    req.setRequestHeader('Content-Type', 'text/html');

    if (this.options.method.toUpperCase() == 'GET') {
      req.send(null);
    } else {
      var formData = this.options.formData || new FormData();
      
      req.send(formData);
    }

  }
}

export default Request; 