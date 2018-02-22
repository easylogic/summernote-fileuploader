let counter = 0;
let cached = [];

export default class Dom {

    constructor(tag, className, attr) {

        if (typeof tag != 'string') {
            this.el = tag;
        } else {

            var el = document.createElement(tag);
            this.uniqId = counter++;

            if (className) {
                el.className = className;
            }

            attr = attr || {};

            for (var k in attr) {
                el.setAttribute(k, attr[k]);
            }

            this.el = el;
        }
    }


    attr(key, value) {
        if (arguments.length == 1) {
            return this.el.getAttribute(key);
        }

        this.el.setAttribute(key, value);

        return this;
    }

    closest(cls) {

        var temp = this;
        var checkCls = false;

        while (!(checkCls = temp.hasClass(cls))) {
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

    removeClass(cls) {
        this.el.className = (` ${this.el.className} `).replace(` ${cls} `, ' ').trim();
    }

    hasClass(cls) {
        if (!this.el.className) {
            return false;
        } else {
            var newClass = ` ${this.el.className} `;
            return newClass.indexOf(` ${cls} `) > -1;
        }
    }

    addClass(cls) {
        if (!this.hasClass(cls)) {
            this.el.className = `${this.el.className} ${cls}`;
        }

        return this;
    }

    toggleClass(cls) {
        if (this.hasClass(cls)) {
            this.removeClass(cls);
        } else {
            this.addClass(cls);
        }
        return this;
    }

    find(selector) {
        return new Dom(this.el.querySelector(selector));
    }

    findAll(selector) {
        return [...this.el.querySelectorAll(selector)].map((node) => {
            return new Dom(node);
        })
    }

    html (html) {
        if (arguments.length == 0) {
          return this.el.innerHTML;
        }
    
        if (typeof html === 'string') {  // html 
          this.el.innerHTML = html;
        } else if (Array.isArray(html)) {  // dom list 
          var arr = html.map(el => {
            return el.el ? el.el : el; 
          })
    
          let fragment = document.createDocumentFragment();
          arr.forEach(el => {
            fragment.appendChild(el);
          });
    
          this.el.innerHTML = ''; 
          this.append(fragment);
    
        } else if (typeof html === 'object') {  // dom 
          this.append(html);
        }  
    
        return this;
      }

    empty() {
        return this.html('');
    }
    after(el) {
        if (typeof el == 'string') {
            this.el.parentNode.insertBefore(document.createTextNode(el), this.el.nextSibling);
        } else {
            this.el.parentNode.insertBefore(el.el || el, this.el.nextSibling);
        }

        return this;
    }

    before() {
        if (typeof el == 'string') {
            this.el.parentNode.insertBefore(document.createTextNode(el), this.el);
        } else {
            this.el.parentNode.insertBefore(el.el || el, this.el);
        }

        return this;
    }

    append(el) {

        if (typeof el == 'string') {
            this.el.appendChild(document.createTextNode(el));
        } else {
            this.el.appendChild(el.el || el);
        }

        return this;
    }

    appendTo(target) {

        if (typeof target == 'string') {
            target = document.querySelector(target);
        }

        if (target) {
            var t = target.el ? target.el : target;

            t.appendChild(this.el);
        }
        return this;
    }
    parent() {
        if (this.el.parentNode) {
            return new Dom(this.el.parentNode)
        }

        return null;
    }
    remove() {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }

        return this;
    }

    text() {
        return this.el.textContent;
    }

    css(key, value) {
        if (arguments.length == 2) {
            this.el.style[key] = value;
        } else if (arguments.length == 1) {

            if (typeof key == 'string') {
                return getComputedStyle(this.el)[key];
            } else {
                var keys = key || {};
                for (var k in keys) {
                    this.el.style[k] = keys[k];
                }
            }

        }

        return this;
    }

    offset() {
        var rect = this.el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    position() {
        return {
            top: parseFloat(this.el.style.top),
            left: parseFloat(this.el.style.left)
        };
    }

    width() {
        return this.el.offsetWidth;
    }

    height() {
        return this.el.offsetHeight;
    }

    dataKey(key) {
        return this.uniqId + '.' + key;
    }

    data(key, value) {
        if (arguments.length == 2) {
            cached[this.dataKey(key)] = value;
        } else if (arguments.length == 1) {
            return cached[this.dataKey(key)];
        } else {
            var keys = Object.keys(cached);

            var uniqId = this.uniqId + ".";
            return keys.filter(function (key) {
                if (key.indexOf(uniqId) == 0) {
                    return true;
                }

                return false;
            }).map(function (value) {
                return cached[value];
            })
        }

        return this;
    }

    val(value) {
        if (arguments.length == 0) {
            return this.el.value;
        } else if (arguments.length == 1) {
            this.el.value = value;
        }

        return this;
    }

    int(value) {
        if (arguments.length == 0) {
            return parseInt(this.val(), 10);
        } else {
            this.val(parseInt(value, 10));
        }

        return this;
    }

    float(value) {
        if (arguments.length == 0) {
            return parseFloat(this.val());
        } else {
            this.val(parseFloat(value));
        }

        return this;
    }

    show() {
        return this.css('display', 'block');
    }

    hide() {
        return this.css('display', 'none');
    }

    toggle() {
        if (this.css('display') == 'none') {
            return this.show();
        } else {
            return this.hide();
        }
    }

    on(eventName, callback, opt1, opt2) {
        this.el.addEventListener(eventName, callback, opt1, opt2);

        return this;
    }

    off(eventName, callback) {
        this.el.removeEventListener(eventName, callback);

        return this;
    }

    getElement() {
        return this.el;
    }

    createChild(tag, className = '', attrs = {}, css = {}) {
        let $element = new Dom(tag, className, attrs);
        $element.css(css);

        this.append($element);

        return $element;
    }
}

