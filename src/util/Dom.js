let DataCache = {};
let Counter = 0; 

class Dom {

  constructor (tag, className, attr) {
    this.tag = tag;
    this.className = className;
    this.attr = attr; 

    this.initialize();
    
  }

  initialize () {
    if (typeof this.tag != 'string') {
      this.el = this.tag;
    } else {
        var el  = document.createElement(this.tag);

        this.uniqId = Counter++;

        el.className = this.className;

        const attr = this.attr || {};
        for(var k in attr) {
            el.setAttribute(k, attr[k]);
        }

        this.el = el;
    }
  }

  closest(cls) {
    var temp = this;
    var checkCls = false;

    while(!(checkCls = temp.hasClass(cls))) {
        if (temp.el.parentNode) {
            temp = new Dom(temp.el.parentNode);
        } else {
            return null;
        }
    }

    if (checkCls) {
        return temp;
    }

    return null;
  }

  static trim (data) {
    return data.replace(/^\s+|\s+$/g, '');
  }

  removeClass (cls) {
    this.el.className = Dom.trim((" " + this.el.className + " ").replace(' ' + cls + ' ', ' '));
  }
  
  hasClass (cls) {
    if (!this.el.className) return false; 

    var newClass = ` ${this.el.className} `;
    return newClass.indexOf(` ${cls} `) > -1;  
  }

  addClass (cls) {
    if (!this.hasClass(cls)) {
        this.el.className = `${this.el.className} ${cls}`;
    }

    return this; 
  }

  html (html) {
    if (arguments.length == 0) {
      return this.el.innerHTML;
    }

    if (Array.isArray(html)) {
      var arr = html.map(el => {
        return el.el ? el.el : el; 
      })

      let fragment = document.createDocumentFragment();
      arr.forEach(el => {
        fragment.appendChild(el);
      });

      this.el.innerHTML = ''; 
      this.el.append(fragment);

    } else {
      this.el.innerHTML = html;
    }

    return this;
  }

  empty () {
    return this.html('');
  }

  append (el) {
    if (typeof el == 'string') {
        this.el.appendChild(document.createTextNode(el));
    } else {
        this.el.appendChild(el.el || el);
    }

    return this;
  }

  appendTo (target) {

    if (typeof target == 'string') {
      target = document.querySelector(target);
    }

    if (target) {

      var t = target.el ? target.el : target;
      t.appendChild(this.el);
    }

    return this;
  }

  remove () {
    if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
    }

    return this;
  }

  text () {
    return this.el.textContent;
  }

  css (key, value) {
    if (arguments.length == 2) {
        this.el.style[key] = value;
    } else if (arguments.length == 1) {
        if (typeof key == 'string') {
            return getComputedStyle(this.el)[key];
        } else {
            var keys = key || {};
            for(var k in keys) {
                this.el.style[k] = keys[k];
            }
        }

    }

    return this;
  }

  offset () {
    var rect = this.el.getBoundingClientRect();

    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
  }

  position () {
    return {
        top: parseFloat(this.el.style.top),
        left: parseFloat(this.el.style.left)
    };
  }

  width () {
    return this.el.offsetWidth;
  }

  height () {
    return this.el.offsetHeight;
  }

  dataKey (key) {
    return this.uniqId + '.' + (key || "");
  }

  val (value) {
    if (arguments.length == 0) {
        return this.el.value;
    } else if (arguments.length == 1) {
        this.el.value = value;
    }

    return this;
  }

  int (value) {
    if (arguments.length == 0) {
      return parseInt(this.val(), 10);
    } else {
      this.val(parseInt(value, 10));
    }
    
    return this; 
  }

  float (value) {
    if (arguments.length == 0) {
      return parseFloat(this.val());
    } else {
      this.val(parseFloat(value));
    }
    
    return this; 
  }  

  show () {
    return this.css('display', 'block');
  }

  hide () {
    return this.css('display', 'none');
  }

  addEventListener (eventName, callback, opt1) {
    this.el.addEventListener(eventName, callback, opt1 || false);
  }

  removeEventListener (eventName, callback, opt1) {
    this.el.removeEventListener(eventName, callback);
  }  

}

export default Dom 