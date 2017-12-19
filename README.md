# Summernote-fileuploader

Html5 File Uploader Plugin for Summernote 

# Use 

```javascript
$("#summernote").summernote({
    modules : {
        fileuploader : {

            render : {

                itemClass : 'xxx xxx xxx',
                itemClass : function (file, i) {
                    return ['xxx' +  'ab' + 'xxx'];
                },
                itemClass : function (file, i) {
                    return new Promise(file).then(xxxx);
                }
                itemStyle : {
                    'background-color': 'yellow',
                    'color' : 'white',
                },
                itemStyle : function (file, i) {
                    return {
                        'width' : 100,
                        'height' : 200
                    }
                },
                itemStyle : function (file, i) {
                    return new Promise({
                        sxxx
                    }).then(xxxx);
                },

                template : function (file) {
                    return htmlString;
                    return dom; 
                    return domArray; 
                    return new Promise({}).then();
                }
            },
            responseType : 'arraybuffer',
            params : {
                key: value,
                key: value,
                key: valueFunction 
            },
            params : function (file, i) {
               return {
                    key: value,
                    key: value,
                    key: valueFunction 
                }      
            },
            params: function (file, i) {
                return new Promise().then();
            },
            headers : {
                'Content-Type': 'text/html;charset=utf-8',
                'Connection': 'close',
            },
            headers : function (file, i) {
                return {
                    'Content-Type': 'text/html;charset=utf-8',
                    'Connection': 'close',
                }
            },
            headers : function (file, i) {
                return new Promise({
                    'Content-Type': 'text/html;charset=utf-8',
                    'Connection': 'close',
                }).then();
            },
            method : 'post',
            method : 'get',
            url : {
                host : '',
                port : '',
                protocol : '',
                path : '',
                query : '' 
            },
            url : urlString   // url ,  paring 
            url: 'http://www.domain.co.kr/xxxxxxxxx?xxxx',
            url : function (file) {
                if (file.type.indexOf('image/') > -1) {
                    return '/image/server/upload';
                } else {
                    return '/file/server/upload';
                }
            }
        }
    }
})


```

# upload tab 

* server upload 
* directory service 
* google drive 
* s3 
* evernote 

tab service 

# dev 

# build 

# install 


# License  MIT
