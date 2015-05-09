-function () {
    var window = this || (0, eval)('this');
    window.Portal = window.Portal || {};
    var util = {};
    window.Portal.Util = util;
    /**
    * 获取url参数
    * @name 参数名
    */
    util.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return "";
    };
    /**
    * 字符串格式化,类似C# string.Format
    * 例如：util.Format("Hello {0},wellcome to xxxx","ZhangSan") 
    *       print "Hello ZhangSan,wellcome to xxxx"
    */
    util.Format = function () {
        if (arguments.length == 0) return "";
        if (arguments.length == 1) return arguments[0];
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };
    /**
    * 拼接url的参数
    * @url
    * @parameters 参数{'key1':'value1'}
    */
    //
    util.appendQueryString = function (url, parameters) {
        for (var key in parameters) {
            if (parameters[key] === null || parameters[key] === undefined) {
                continue;
            }
            url += key + "=" + escape(parameters[key]) + "&";
        }
        return url;
    };
    /**
    * 最大化弹出新窗口
    * @URL 页面地址
    *
    */
    util.OpenFullWnd = function (URL) {
        var width = screen.availWidth - 10;
        var height = screen.availHeight - 30;
        return window.open(URL, "_blank", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=" + width + ",height=" + height + ",top=0,left=0");
    };
    /**
    * 获取浏览器内部的高度
    */
    util.getBrowerHeight = function () {
        return util.getBrowserType().ie ? document.documentElement.clientHeight
                            : document.body.scrollHeight;
    };
    /**
    * 获取浏览器内部的宽度
    */
    util.getBrowerWidth = function () {
        return util.getBrowserType().ie ? document.documentElement.clientWidth
                            : document.body.scrollWidth;
    };
    util.getBodyWidth = function () {
        return document.body.width;
    };
    /**
    * 获取站点的根目录
    */
    //true表示在iis中以站点形式发布，false表示以应用程序发布
    var flag = false;
    util.getRootPath = function () {
        if (flag)
            return "/";
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        return (prePath + postPath + "/");
    };
    /**
    * 获取浏览器类型
    * Sys.ie为true，表示浏览器为ie浏览器
    */
    util.getBrowserType = function () {
        var Sys = {};
        try {
            var ua = navigator.userAgent.toLowerCase();
            var uaLength = ua.length;
            if ((ua.indexOf('msie') > -1 && ua.indexOf('opera') == -1) ||
                (ua.indexOf('msie') == -1 && ua.indexOf('trident') > -1)) {
                Sys.ie = true;
            }
            else if (ua.indexOf("firefox") > 0) {
                Sys.firefox = true;
            }
            else if (ua.indexOf("chrome") > 0) {
                Sys.chrome = true;
            }
            else if (ua.indexOf("safari")) {
                Sys.safari = true;
            }
            else {
                Sys.chrome = true;
            }
        } catch (e) {
            console.log(e)
        }
        return Sys;
    };
    /**
    * 继承
    */
    util.extend = function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    };
    /**
    * 判断是否为空
    */
    util.isNull = function (data) {
        return data == null || typeof data == "undefined" || data == "";
    };

    /**
    * 验证session是否失效
    */
    util.validSession = function (success, error) {
        $.ajax({
            url: util.getRootPath() + "Portal/Handler/HomeHandler.ashx?req=sessionvalid",
            type: "post",
            cache: false,
            success: function (data) {
                if (data == "" || !data.loginstatus) {
                    error();
                }
                else {
                    success();
                }
            }
        });
    };
    var _setValue = function (obj, key, value) {
        if (typeof obj[key] === "function")
            obj[key](value)
        else if (typeof obj[key] === "undefined") {
            obj[key] = ko.observable(value);
        }
        else {
            obj[key] = value;
        }
    };
    var _getValue = function (obj) {
        if (typeof obj === "function")
            return obj();
        else {
            return obj;
        }
    }
    util.copyValue = function (fromObjec, toObject) {
        if (util.isNull(fromObjec))
            return null;
        for (var p in fromObjec) {
            _setValue(toObject, p, _getValue(fromObjec[p]));
        }
    };

    util.calculateIndexs = function (pageIndex, totalpages, beforeIndex, afterIndex) {
        var before = beforeIndex || 3,
                after = afterIndex || 1,
                afterMin = totalpages - after + 1,
                afterMax = totalpages,
                middle = afterMin - 2,
                beforeMin = 0,
                beforeMax = 0;
        var isShowSplit = false, beforeIndexs = [], afterIndexs = [];

        if (after >= totalpages) {
            afterMin = 1;
        }
        else if (after + before >= totalpages) {
            beforeMin = 1;
            beforeMax = before >= afterMin ? afterMin - 1 : before;
        }
        else if ((pageIndex >= afterMin && pageIndex <= afterMax) || pageIndex >= middle) {
            beforeMin = middle - 1;
            beforeMax = middle + 1;
        }
        else {
            beforeMin = pageIndex == 1 ? 1 : (pageIndex - 1);
            beforeMax = pageIndex == 1 ? before : (pageIndex + 1);
            isShowSplit = true;
        }
        for (; beforeMin <= beforeMax && beforeMax > 0; beforeMin++) {
            beforeIndexs.push({ index: ko.observable(beforeMin), cssclass: ko.observable("") });
        }
        for (; afterMin <= afterMax && afterMax > 0; afterMin++) {
            afterIndexs.push({ index: ko.observable(afterMin), cssclass: ko.observable("") });
        }
        return { isShowSplit: isShowSplit, beforeIndexs: beforeIndexs, afterIndexs: afterIndexs };
    };

    util.changeIndexCSS = function (pageIndex, viewModel) {
        $.each(viewModel.beforeIndexs(), function () {
            if (pageIndex != this.index()) {
                this.cssclass("navigation-normal");
            }
            else {
                this.cssclass("navigation-active");
            }
        });
        $.each(viewModel.afterIndexs(), function () {
            if (pageIndex != this.index()) {
                this.cssclass("navigation-normal");
            }
            else {
                this.cssclass("navigation-active");
            }
        });
    };

    util.prevPage = function (viewModel) {
        if (self.pageIndex() <= 1)
            return;
        var newPageIndex = self.pageIndex() - 1;
        self.query(viewModel, newPageIndex);
    };
    //下一页
    util.nextPage = function (viewModel) {
        if (self.pageIndex() >= self.totalPages())
            return;
        var newPageIndex = self.pageIndex() + 1;
        self.query(viewModel, newPageIndex);
    };
    /**
    * 遍历Json给ViewModel赋值
    * result=vm  source=json
    */
    util.foreachJson = function (result, source) {
        if (source === undefined || source === null) {
            return null;
        };
        for (var p in source) {
            if (typeof result[p] === "function") {
                result[p](source[p]);
            };
        };
    };
    util.getContentHeight = function () {
        return util.getBrowerHeight() - 155;
    }
} ();

/**
* 时间对象的格式化;
*/
Date.prototype.format = function (format) {
    /*
    * eg:format="YYYY-MM-dd hh:mm:ss";
    */
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**判断数组是否包含*/
Array.prototype.contains = function (item) {
    return RegExp(item).test(this);
}