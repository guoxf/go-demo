//PageConfig v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library

(function (window) {
    window.PageConfig = window.PageConfig || {};
    PageConfig.Util = new (function () {
        return {
            /**
            * 将普通的对象转换成ko对象
            */
            foreachProperty: function (source) {
                if (source === undefined || source === null)
                    return null;
                var result = {};
                for (var p in source) {
                    result[p] = ko.observable(source[p]);
                }
                return result;
            },
            /**
            * 克隆对象
            */
            foreachProperty2: function (source) {
                if (source === undefined || source === null)
                    return null;
                var result = {};
                for (var p in source) {
                    result[p] = source[p];
                }
                return result;
            },
            /**
            * 复制值，如果不存在就添加
            */
            foreachProperty3: function (result, source) {
                if (source === undefined || source === null)
                    return null;
                for (var p in source) {
                    if (typeof result[p] !== "undefined")
                        result[p](source[p]());
                    else
                        result[p] = ko.observable(source[p]());
                }
                return result;
            },
            /**
            *
            */
            foreachArray: function (source, result) {
                if (source === undefined || source === null || source.length == 0)
                    return;
                $.each(source, function (key, value) {
                    result.push(PageConfig.Util.foreachProperty(value));
                });
            },
            /**
            *
            */
            cloneData: function (source, result) {//
                if (source === undefined || source === null)
                    return null;
                for (var p in source) {
                    if (result[p] === undefined) {//复制值，如果不存在就添加
                        result[p] = ko.observable(source[p]());
                    }
                    else {
                        result[p](source[p]());
                    }
                }
                return result;
            },
            /**
            * 将Boolean转换成int
            */
            booleanToInt: function (data) {
                if (typeof data === "function") {
                    if (data() === true) {
                        data(1);
                    }
                    else if (data() === false) {
                        data(0);
                    }
                }
                else {
                    if (data === true) {
                        data = 1;
                    }
                    else if (data === false) {
                        data = 0;
                    }
                }
            },
            /**
            * 千分位格式转成金额
            */
            thousanthsAmountToFloat: function (data) {
                if (typeof data === "function" && typeof data() !== "undefined") {
                    data(data().toString().replace(/,/g, ""));
                }
                else if (typeof data !== "undefined") {
                    data = data.toString().replace(/,/g, "")
                }
            },
            escape: function (configs, data) {
                ko.utils.arrayForEach(configs, function (config) {
                    if (config.elementtype === "CheckBox") {
                        PageConfig.Util.booleanToInt(data[config.fieldname]);
                    }
                    else if (config.elementtype === "Money") {
                        PageConfig.Util.thousanthsAmountToFloat(data[config.fieldname]);
                    }
                });
            },
            /**
            * 验证是否是方法，并执行
            */
            validAndExecuteFunction: function (fn, result, data) {
                var continueFlag = true;
                if (typeof fn === "function")
                    continueFlag = fn(result, data);
                return continueFlag;
            },
            /**
            * 将对象的属性都设置为undefined
            */
            clearData: function (data) {
                for (var p in data) {
                    if (typeof data[p] === "object") {
                        PageConfig.Util.clearData(data[p]);
                    }
                    else if (typeof data[p] === "function") {
                        data[p](undefined);
                    }
                    else {
                        data[p] = undefined;
                    }
                }
            },
            /**
            * 设置为undefined
            */
            setUndefined: function (data) {
                if (typeof data === "undefined") {
                    return;
                }
                if (typeof data === "object") {
                    PageConfig.Util.clearData(data);
                }
                else if (typeof data === "function") {
                    data(undefined);
                }
                else {
                    data = undefined;
                }
            },
            /**
            * 判断是否必填
            */
            requireds: function (config, data, language) {
                var flage = true;
                $.each(config, function () {
                    flage = PageConfig.Util.required(this, data, language);
                    return flage;
                });
                return flage;
            },
            /**
            * 判断是否必填
            */
            required: function (value, data, language) {
                var flage = true;
                if (value.isrequired === 1) {
                    var val = typeof data[value.valuename] === "function" ? data[value.valuename]() : data[value.valuename];
                    if (PageConfig.Util.isNull(val)) {
                        if (value.elementtype == "TextBox") {
                            Portal.Util.alert(2,"请输入" + value["display" + language]);
                            flage = false;
                        } else if (value.elementtype == "Select" || value.elementtype == "SelectUser") {
                            Portal.Util.alert(2,"请选择" + value["display" + language]);
                            flage = false;
                        }
                    }
                }
                return flage;
            },
            /**
            * 判断是否为空
            */
            isNull: function (data) {
                return data == null || typeof data == "undefined" || data == "";
            },
            /**
            * 继承
            */
            extend: function (subClass, superClass) {
                var F = function () { };
                F.prototype = superClass.prototype;
                subClass.prototype = new F();
                subClass.prototype.constructor = subClass;

                subClass.superclass = superClass.prototype;
                if (superClass.prototype.constructor == Object.prototype.constructor) {
                    superClass.prototype.constructor = superClass;
                }
            }
        };
    })();
})(window);