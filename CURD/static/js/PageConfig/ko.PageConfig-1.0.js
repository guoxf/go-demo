//PageConfig.Util v1.0
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
                            Portal.Util.alert(2, "请输入" + value["display" + language]);
                            flage = false;
                        } else if (value.elementtype == "Select" || value.elementtype == "SelectUser") {
                            Portal.Util.alert(2, "请选择" + value["display" + language]);
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

//PageConfig.Valid v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function (window) {
    if (typeof window.PageConfig === "undefined")
        window.PageConfig = {};
    var pageConfig = window.PageConfig;
    pageConfig.Valid = pageConfig.Valid || {};
    //只能输入数字
    pageConfig.Valid.Int = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        var value = element.value.replace(/\D/g, '');
        element.value = value;
        allBingdsAccessor()["value"](value);
    };
    //只能输入英文和数字
    pageConfig.Valid.Alphanumeric = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.utils.registerEventHandler(element, "keyup", function () {
            var value = element.value.replace(/[\W]/g, '');
            element.value = value;
            allBingdsAccessor()["value"](value);
        });
    };
    //只能输入浮点数
    pageConfig.Valid.Float = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.utils.registerEventHandler(element, "keyup", function () {
            var value = element.value;
            var maxlength = 2;
            if (allBingdsAccessor()["floatmax"] != undefined) {
                maxlength = allBingdsAccessor()["floatmax"];
            }
            var newValue = replaceFloat(value, maxlength);
            element.value = newValue
            allBingdsAccessor()["value"](newValue);
        });
        ko.utils.registerEventHandler(element, "blur", function () {
            var value = element.value;
            var maxlength = 2;
            if (allBingdsAccessor()["floatmax"] != undefined) {
                maxlength = allBingdsAccessor()["floatmax"];
            }
            var newValue = Number(replaceFloat(value, maxlength));
            // newValue = newValue.toFixed(maxlength); //小数补位
            element.value = newValue;
            allBingdsAccessor()["value"](newValue);
        });
    };
    //电话号码 021-7777777/021-88888888/0513-7777777/0513-88888888
    pageConfig.Valid.Telephone = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.utils.registerEventHandler(element, "blur", function () {
            var value = element.value
            var regex = /(^\d{4}-(\d{8}|\d{7})$)|(^\d{3}-(\d{8}|\d{7})$)/g;
            if (!regex.test(value)) {
                $(element).addClass("errorBorder");
                Portal.Util.alert(2, "电话号码的格式不正确！");
            }
            else {
                $(element).removeClass("errorBorder");
            }
        });
    };
    //邮件地址
    pageConfig.Valid.Email = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.utils.registerEventHandler(element, "blur", function () {
            var value = element.value
            var regex = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z-]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]|net|NET|asia|ASIA|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|cn|CN|cc|CC)$/;
            if (!regex.test(value)) {
                Portal.Util.alert(2, "邮件地址的格式不正确！");
                $(element).addClass("errorBorder");
            }
            else {
                $(element).removeClass("errorBorder");
            }
        });
    };
})(window);

//KO 绑定文本框验证事件
ko.bindingHandlers.valid = {
    init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        //只能输入数字
        if (valueAccessor() == "Int") {
            ko.utils.registerEventHandler(element, "keyup", function () {
                PageConfig.Valid.Int(element, valueAccessor, allBingdsAccessor, viewModel);
            });
        }
        //只能输入英文和数字
        else if (valueAccessor() == "Alphanumeric") {
            PageConfig.Valid.Alphanumeric(element, valueAccessor, allBingdsAccessor, viewModel);
        }
        //只能输入浮点数
        else if (valueAccessor() == "Float") {
            PageConfig.Valid.Float(element, valueAccessor, allBingdsAccessor, viewModel);
        }
        //电话号码 021-7777777/021-88888888/0513-7777777/0513-88888888
        else if (valueAccessor() == "Telephone") {
            PageConfig.Valid.Telephone(element, valueAccessor, allBingdsAccessor, viewModel);
        }
        //邮件地址
        else if (valueAccessor() == "Email") {
            PageConfig.Valid.Email(element, valueAccessor, allBingdsAccessor, viewModel);
        }
    },
    update: function (element, valueAccessor, allBingdsAccessor, viewModel) {
    }
};
//KO 绑定文本框时间格式化事件
ko.bindingHandlers.dateFormat = {
    init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.bindingHandlers.dateFormat.format(element, valueAccessor, allBingdsAccessor, viewModel);
    },
    update: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.bindingHandlers.dateFormat.format(element, valueAccessor, allBingdsAccessor, viewModel);
    },
    format: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        var format = valueAccessor();
        var formatAccessor = allBingdsAccessor()["text"] || allBingdsAccessor()["value"]
        var value;
        if (typeof formatAccessor === "function") {
            value = formatAccessor();
        }
        else {
            value = formatAccessor;
        }
        if (value != "" && value != null && value != undefined) {
            var date;
            // "/Date(-2209017600000+0800)/" json 日期格式
            if (value.indexOf("Date") == 1) {
                date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
            // "2013-09-29 14:45:99" 普通 日期格式
            else {
                date = new Date(Date.parse(value.replace(/-/g, "/")));
            }
            var newvalue = date.format(format);
            if (typeof formatAccessor === "function") {
                formatAccessor(newvalue);
            }
            else if (allBingdsAccessor()["text"]) {
                element.innerHTML = newvalue;
            }
            else {
                $(element).val(newvalue);
            }
        }
    }
};

//KO 绑定文本框时间格式化事件
ko.bindingHandlers.textChange = {
    init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        var language = valueAccessor();
        var textAccessor = allBingdsAccessor()["text"] || allBingdsAccessor()["value"];
        var value = textAccessor();
        var data = allBingdsAccessor()["datasource"];
        var newvalue = data[language][value];
        element.value = newvalue;
        textAccessor(newvalue);
    },
    update: function (element, valueAccessor, allBingdsAccessor, viewModel) {
    }
};

//按浮点数规则正确替换值 value:值 maxlength 小数点后最大位数
var replaceFloat = function (value, maxlength) {
    //先把非数字的都替换掉，除了数字和.
    value = value.replace(/[^\d.\-]/g, "");
    //必须保证第一个为数字而不是.
    value = value.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    value = value.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    valuelist = value.split('.');
    if (valuelist.length > 1) {
        var int = valuelist[0];
        var decimal = valuelist[1];
        if (decimal.length > maxlength) {
            value = int + "." + decimal.substr(0, maxlength);
        }
    }
    return value;
};


//PageConfig.Template v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function (window) {
    window.PageConfig = window.PageConfig || {};
    var dateFormatArray = {
        Datepicker: ",dateFormat:'yyyy-MM-dd'",
        DateTimePicker: ",dateFormat:'yyyy-MM-dd hh:mm'",
        EndDatePicker: ",dateFormat:'yyyy-MM-dd'",
        StartDatePicker: ",dateFormat:'yyyy-MM-dd'"
    };
    var pageConfig = window.PageConfig;
    pageConfig.generateByElement = new (function () {
        return {
            /**
            * 生成文本框的html
            */
            TextBox: function (config, language, prefix) {
                var textTemplate = "<td style=\"width:{0}\"><input style=\"width: 98%;\" type='text' maxlength=\"{1}\" " +
                                        " data-bind=\"{2}\" /></td>";
                prefix = prefix || "";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("value:" + config.fieldname);
                var clickevent = config[prefix + "clickevent"];
                if (!PageConfig.Util.isNull(clickevent)) {
                    if (clickevent.indexOf("function(") >= 0) {
                        bindings.push("click:" + clickevent);
                    }
                    else {
                        bindings.push("click:$root.event." + clickevent);
                    }
                }
                if (!PageConfig.Util.isNull(config.validrule)) {
                    bindings.push("valid:'" + config.validrule + "'");
                }
                if (!PageConfig.Util.isNull(config.decimalplace)) {
                    bindings.push("floatmax:" + config.decimalplace + "");
                }
                var htmlString = Portal.Util.Format(textTemplate, config[prefix + "width"], config.length, bindings.join(",")); ;
                return htmlString;
            },
            /**
            * 生成文本区域框的html
            */
            TextArea: function (config, language, prefix) {
                var textTemplate = "<td width=\"{0}\"><textarea  rows='{1}'  style=\"width: 98%;\" {2} " +
                                        " data-bind=\"{3}\" /></td>\r\n";
                prefix = prefix || "";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("value:" + config.fieldname);
                var clickevent = config[prefix + "clickevent"];
                if (!PageConfig.Util.isNull(clickevent)) {
                    if (clickevent.indexOf("function(") >= 0) {
                        bindings.push("click:" + clickevent);
                    }
                    else {
                        bindings.push("click:event." + clickevent);
                    }
                }
                if (!PageConfig.Util.isNull(config.validrule)) {
                    bindings.push("valid:'" + config.validrule + "'");
                }
                if (!PageConfig.Util.isNull(config.decimalplace)) {
                    bindings.push("floatmax:" + config.decimalplace + "");
                }
                var htmlString = Portal.Util.Format(textTemplate, config[prefix + "width"],
                PageConfig.Util.isNull(config.textarearowcount) ? 4 : config.textarearowcount, PageConfig.Util.isNull(config.length) ? "" : ("maxlength=\"" + config.length + "\""), bindings.join(",")); ;
                return htmlString;
            },
            Money: function (config, language, prefix) {
                var textTemplate = "<td width=\"{0}\"><input style=\"width: 98%;min-width:100px;\" type='text' maxlength=\"{1}\" " +
                                        " data-bind=\"{2}\" /></td>\r\n";
                prefix = prefix || "";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("value:" + config.fieldname);
                bindings.push("amountThousandth:" + config.fieldname);
                var clickevent = config[prefix + "clickevent"];
                if (!PageConfig.Util.isNull(clickevent)) {
                    if (clickevent.indexOf("function(") >= 0) {
                        bindings.push("click:" + clickevent);
                    }
                    else {
                        bindings.push("click:event." + clickevent);
                    }
                }
                if (!PageConfig.Util.isNull(config.validrule)) {
                    bindings.push("valid:'" + config.validrule + "'");
                }
                if (!PageConfig.Util.isNull(config.decimalplace)) {
                    bindings.push("floatmax:" + config.decimalplace + "");
                }
                var htmlString = Portal.Util.Format(textTemplate, config[prefix + "width"], config.length, bindings.join(",")); ;
                return htmlString;
            },
            /**
            * 生成下拉框的html
            */
            Select: function (config, language, prefix, parent) {
                prefix = prefix || "";
                parent = parent || "";
                var selectTemplate = "<td style='width:{0};'><select style=\"width: 98%\" " +
                                        "data-bind=\"{1}\"></select></td>\r\n";
                var bindings = new Array();
                bindings.push("selectCallBack:$root.event.selectCallBack");
                bindings.push("valueField:'" + config.fieldname + "'");
                bindings.push("nameField:'" + config.optionstextfield + "'");

                bindings.push("options:$root.dataSource.select." + parent + config["fieldname"]);
                if (!PageConfig.Util.isNull(config.optionstextfield) && config.optionstextfield != config.fieldname) {
                    bindings.push("selectedName:" + config.optionstextfield);
                }
                bindings.push("value:" + config.fieldname);
                bindings.push("optionsText:'" + config.optionstext + "'");
                bindings.push("optionsValue:'" + config.optionsvalue + "'");
                if (!PageConfig.Util.isNull(config.datasource) && config.datasource != "{}") {
                    var reg = new RegExp('"', "g");
                    var dataSource = config.datasource.replace(reg, "'");
                    eval("var conf=" + config.datasource);
                    bindings.push("optionsExtend:" + dataSource);
                    var cascadeParent = conf.cascadeParent;
                    if (!PageConfig.Util.isNull(cascadeParent) && cascadeParent.length > 0) {
                        bindings.push("triggerField:trigger" + config.fieldname);
                    }
                }

                bindings.push("optionsCaption:$root.language.optionscaption");
                var changeevent = config[prefix + "changeevent"];
                if (!PageConfig.Util.isNull(changeevent)) {
                    if (changeevent.indexOf("function(") >= 0) {
                        bindings.push(Portal.Util.Format("event:{'change':{0}}", changeevent));
                    }
                    else {
                        bindings.push(Portal.Util.Format("event:{'change':$root.event.{0}}", changeevent));
                    }
                }
                return Portal.Util.Format(selectTemplate, config[prefix + "width"], bindings.join(","));
            },
            /**
            * 生成日期控件的html
            */
            Date: function (config, language, prefix) {
                prefix = prefix || "";
                var dateTemplate = "<td style='width:{0};'><div id='{1}' class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{2}\" style=\"float:left\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"{3}\" type=\"text\" readonly=\"readonly\">" +
"<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div></td>\r\n";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("datepicker: " + (PageConfig.Util.isNull(config.datasource) ? "{}" : config.datasource));
                return Portal.Util.Format(dateTemplate, config[prefix + "width"], prefix + config.fieldname, bindings.join(","), "value:" + config.fieldname);
            },
            DateTime: function (config, language, prefix) {
                prefix = prefix || "";
                var dateTemplate = "<td style='width:{0};'><div id='{1}' class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{2}\" style=\"float:left\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"{3}\" type=\"text\" readonly=\"readonly\">" +
"<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div></td>\r\n";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("datepicker: " + (PageConfig.Util.isNull(config.datasource) ? "{type:'datetime'}" : config.datasource));
                return Portal.Util.Format(dateTemplate, config[prefix + "width"], prefix + config.fieldname, bindings.join(","), "value:" + config.fieldname);
            },
            StartDate: function (config, language, prefix) {
                prefix = prefix || "";
                var dateTemplate = "<td style='width:{0};'><div id='{1}' class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{2}\" style=\"float:left\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"{3}\" type=\"text\" readonly=\"readonly\">" +
"<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div></td>\r\n";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("datepicker: " + Portal.Util.Format("{tag:'start',index:'now',group:'{0}'}", config.dategroup));
                return Portal.Util.Format(dateTemplate, config[prefix + "width"], prefix + config.fieldname, bindings.join(","), "value:" + config.fieldname);
            },
            EndDate: function (config, language, prefix) {
                prefix = prefix || "";
                var dateTemplate = "<td style='width:{0};'><div id='{1}' class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{2}\" style=\"float:left\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"{3}\" type=\"text\" readonly=\"readonly\">" +
"<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div></td>\r\n";
                var bindings = new Array();
                bindings.push("valueUpdate: 'blur'");
                bindings.push("datepicker: " + Portal.Util.Format("{tag:'end',group:'{0}'}", config.dategroup));
                return Portal.Util.Format(dateTemplate, config[prefix + "width"], prefix + config.fieldname, bindings.join(","), "value:" + config.fieldname);
            },
            DateRange: function (config, language, prefix) {
                if (prefix != 'condition') {
                    return pageConfig.generateByElement.Date(config, language, prefix);
                }
                else {
                    prefix = prefix || "";

                    var dateTemplate = "<td style='width:230px;'><div id='{0}' class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{1}\" style=\"float:left\"><input class=\"span2\" style=\"width:80px;\" data-bind=\"{2}\" type=\"text\" readonly=\"readonly\">" +
                    "<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div><span style=\"float:left;\">-</span>" +
                    "<div id='{3}'  class=\"input-append date\" data-provide=\"datepicker-inline\" data-bind=\"{4}\" style=\"float:left\"><input class=\"span2\" style=\"width:80px;\" data-bind=\"{5}\" type=\"text\" readonly=\"readonly\">" +
                    "<span class=\"add-on\"><i class=\"icon-calendar\"></i></span></div></td>\r\n";
                    var bindings = new Array();
                    bindings.push("valueUpdate: 'blur'");
                    bindings.push("datepicker: " + Portal.Util.Format("{tag:'start',group:'{0}'}", config.fieldname));
                    var bindings2 = new Array();
                    bindings2.push("valueUpdate: 'blur'");
                    bindings2.push("datepicker: " + Portal.Util.Format("{tag:'end',group:'{0}'}", config.fieldname));
                    return Portal.Util.Format(dateTemplate, prefix + config.fieldname, bindings.join(","), "value:" + config.fieldname,
                 prefix + config.fieldname + "2", bindings2.join(","), "value:" + config.fieldname + "1");
                }
            },
            /**
            * 生成弹出框的html
            */
            Dialog: function (config, language, prefix) {
                prefix = prefix || "";
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\" style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:width:80%;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
"<span class=\"add-on\"><i class=\"icon-big-square-dialog\" style=\"width: 16px;\"></i></span></div></td>";
                var bindings = new Array();
                if (!PageConfig.Util.isNull(config.datasource)) {
                    bindings.push("dialog:" + config.datasource.replace(new RegExp('"', "g"), "'"));
                }
                if (!PageConfig.Util.isNull(config.optionsvaluefield)) {
                    bindings.push("fieldMap:" + config.optionsvaluefield.replace(new RegExp('"', "g"), "'"));
                }
                return Portal.Util.Format(template, config.optionstextfield, config[prefix + "width"], bindings.join(","), config.textalign);
            },
            DialogUser: function (config, language, prefix) {
                prefix = prefix || "";
                var template = "<td style='width:{1};'><div style=\"width:100%;text-align:{3}\" class=\"input-append\" data-bind=\"{2}\"><input class=\"span2\" style=\"width:80%;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
"<span class=\"add-on\"><i class=\"icon-big-square-dialog\" style=\"width: 16px;\"></i></span></div></td>";
                var bindings = new Array();
                var param = { id: 'SelectUserDialog', datasource: 'DialogUser', isMulti: true, title: '选择用户', valuefield: 'userdspname', idfield: 'userid' };
                if (!PageConfig.Util.isNull(config.datasource)) {
                    eval("var dataSource=" + config.datasource);
                }
                $.extend(param, typeof dataSource === "undefined" ? {} : dataSource);
                bindings.push("dialog:" + ko.toJSON(param).replace(new RegExp('"', "g"), "'"));
                if (!PageConfig.Util.isNull(config.optionsvaluefield)) {
                    bindings.push("fieldMap:" + config.optionsvaluefield.replace(new RegExp('"', "g"), "'"));
                }
                return Portal.Util.Format(template, config.optionstextfield, config[prefix + "width"], bindings.join(","), config.textalign);
            },
            DialogGroup: function (config, language, prefix) {
                prefix = prefix || "";
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\" style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:80%;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
"<span class=\"add-on\"><i class=\"icon-big-square-dialog\" style=\"width: 16px;\"></i></span></div></td>";
                var bindings = new Array();
                var param = { id: 'SelectDeptDialog', datasource: 'DialogGroup', 'sourcetype': 'sql', isMulti: true, title: '选择部门', valuefield: 'groupname', idfield: 'groupid' };
                if (!PageConfig.Util.isNull(config.datasource)) {
                    eval("var dataSource=" + config.datasource);
                }
                $.extend(param, typeof dataSource === "undefined" ? {} : dataSource);
                bindings.push("dialog:" + ko.toJSON(param).replace(new RegExp('"', "g"), "'"));
                if (!PageConfig.Util.isNull(config.optionsvaluefield)) {
                    bindings.push("fieldMap:" + config.optionsvaluefield.replace(new RegExp('"', "g"), "'"));
                }
                return Portal.Util.Format(template, config.optionstextfield, config[prefix + "width"], bindings.join(","), config.textalign);
            },
            DialogRole: function (config, language, prefix) {
                prefix = prefix || "";
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\" style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:80%;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
"<span class=\"add-on\"><i class=\"icon-big-square-dialog\" style=\"width: 16px;\"></i></span></div></td>";
                var bindings = new Array();
                var param = { id: 'SelectRoleDialog', datasource: 'DialogRole', isMulti: true, title: '选择角色', valuefield: 'rolename', idfield: 'roleid' };
                if (!PageConfig.Util.isNull(config.datasource)) {
                    eval("var dataSource=" + config.datasource);
                }
                $.extend(param, typeof dataSource === "undefined" ? {} : dataSource);
                bindings.push("dialog:" + ko.toJSON(param).replace(new RegExp('"', "g"), "'"));
                if (!PageConfig.Util.isNull(config.optionsvaluefield)) {
                    bindings.push("fieldMap:" + config.optionsvaluefield.replace(new RegExp('"', "g"), "'"));
                }
                return Portal.Util.Format(template, config.optionstextfield, config[prefix + "width"], bindings.join(","), config.textalign);
            },
            /**
            * 生成td的html
            */
            TD: function (config, language) {
                var template = "<td data-bind=\"text: {0}{1}\" style=\"text-align:{2}\"></td>";
                var amountTemplate = "<td data-bind=\"amountThousandth:{0},text: {0}{1}\" style=\"text-align:{2}\"></td>";
                var checkboxTemplate = "<td style=\"text-align:center\"><input disabled type=\"checkbox\" data-bind='checked:{0}'/></td>\r\n";
                var align = PageConfig.Util.isNull(config.textalign) ? "center" : config.textalign;
                var dateFormat = PageConfig.Util.isNull(config.dateformat) ? dateFormatArray[config.elementtype] : (",dateFormat:'" + config.dateformat + "'");
                if (PageConfig.Util.isNull(dateFormat)) {
                    dateFormat = "";
                }

                if (config.elementtype == "CheckBox") {
                    return Portal.Util.Format(checkboxTemplate, config.fieldname);
                }
                else if (config.elementtype == "Money") {
                    return Portal.Util.Format(amountTemplate, config.fieldname, dateFormat, align);
                }
                else if (config.elementtype == "Dialog" || config.elementtype == "DialogUser" || config.elementtype == "DialogRole" || config.elementtype == "DialogGroup") {
                    return Portal.Util.Format(template, config.optionstextfield, dateFormat, align);
                }
                else {
                    return Portal.Util.Format(template, config.elementtype == 'Select' ? (PageConfig.Util.isNull(config.optionstextfield) ? config.optionsvaluefield : config.optionstextfield) : config.fieldname, dateFormat, align);
                }
            },
            /**
            * 生成label的html
            */
            Label: function (config, language, prefix) {
                var align = PageConfig.Util.isNull(config.textalign) ? "center" : config.textalign;
                var labelTemplate = "<td data-bind=\"text:{0}\"  style=\"width:{1};text-align:{2};\"/>";
                prefix = prefix || "";
                return Portal.Util.Format(labelTemplate, config.fieldname, config[prefix + "width"], align);
            },
            /**
            * 生成label的html
            */
            _labelRequired: function (config, language, cssClass) {
                var labelTemplate = "<td class='{0}'>{1}{2}</td>";
                var asterisk = config.isrequired === 1 ? "<label style='color:red;vertical-align: middle;'>*</label>" : "";
                return Portal.Util.Format(labelTemplate, cssClass, config["display" + language] + ":", asterisk)
            },
            _label: function (config, language, cssClass) {
                var labelTemplate = "<td class='{0}'>{1}</td>";
                return Portal.Util.Format(labelTemplate, cssClass, config["display" + language] + ":")
            },
            /**
            * 生成checkbox的html
            */
            CheckBox: function (config, language, prefix) {
                prefix = prefix || "";
                var textAlign = "left";
                var checkboxTemplate = "<td  style=\"text-align:{0};width:{1};\"><input type=\"checkbox\" data-bind='checked:{2}'/></td>";
                return Portal.Util.Format(checkboxTemplate, textAlign, config[prefix + "width"], config.fieldname);
            },
            EditButton: function () {
                return "<td style=\"width:150px;text-align:center;\">" +
                            "<button type='button' class='btn btn-link' data-bind='click:$root.event.edit,text:$root.language.edit'></button>" +
                            "<button type='button' class='btn btn-link' data-bind='visible:active()==0,click:$root.event.enable,text:$root.language.enable'></button>" +
                            "<button type='button' class='btn btn-link' data-bind='visible:active()==1,click:$root.event.disable,text:$root.language.disable'></button>" +
                        "</td>";
            },
            /**
            *
            */
            AddButton: function () {
                return "<td style=\"width:150px;text-align:center;\">" +
                            "<button type='button' class='btn btn-link' data-bind='click:$root.event.add,text:$root.language.save'></button>" +
                            "<button type='button' class='btn btn-link' data-bind='click:$root.event.clearEditData,text:$root.language.clear'></button>" +
                        "</td>";
            },
            /**
            * 
            */
            UpdateButton: function () {
                return "<td style=\"width:150px;text-align:center;\">" +
                            "<button type='button' class='btn btn-link' data-bind='click:$root.event.update,text:$root.language.update'></button>" +
                            "<button type='button' class='btn btn-link' data-bind='click:$root.event.cancel,text:$root.language.cancel'></button>" +
                        "</td>";
            },
            /**
            * 生成列表头一列的html
            */
            Header: function (language) {
                return Portal.Util.Format("<!--ko foreach:dataSource.headers--><th align='middle' data-bind=\"click:$root.event.sort,style:{width:width},css:headerClass\" >" +
                                "<a style=\"text-align:center;\" data-bind=\"text:{0}\"></a>" +
                                "<i></i>" +
                          "</th><!--/ko-->", "display" + language);
            },
            /**
            * 生成列表头操作列的html
            */
            Action: function () {
                return "<th data-bind=\"text:$root.language.action\" style=\"text-align:center;\"></th>";
            }
        };
    })();
    pageConfig.generateTemplate = new (function () {
        return {
            /**
            * 生成编辑区域的html
            */
            normalEdit: function (config, container, language, count) {
                var tds = new Array();
                tds.push("<table class=\"table edit\" data-bind=\"with:dataSource.edit\" align=\"center\"><tr style='height: 30px;'>");
                var n = 0;
                $.each(config, function (key, value) {
                    if (value.editvisible == "1") {
                        tds.push(pageConfig.generateByElement._labelRequired(value, language, "edit-header"));
                        if (value.editreadonly == "1") {
                            tds.push(pageConfig.generateByElement.Label(value, language, "edit"));
                        } else {
                            tds.push(pageConfig.generateByElement[value.elementtype](value, language, "edit", "edit"));
                        }
                        n++;
                        if (count != 0 && n % count == 0 && key != (config.length - 1)) {
                            tds.push("</tr><tr style='height: 30px;'>");
                            n = 0;
                        }
                    }
                });
                if (n > 0) {
                    for (; n < count; n++) {
                        tds.push("<td class='edit-header'/><td/>");
                    }
                }
                tds.push("</tr></table>");
                $(container).append(tds.join(""));
            },
            /**
            * 当前行编辑
            */
            currentEdit: function (config, container, language, count, options) {
                var tds = [];
                var editTds = [];
                var addTds = [];
                var templateContainer = $("#divTemplate");
                if (templateContainer.length < 1) {
                    templateContainer = $("<div id='divTemplate'/>");
                    $("body").append(templateContainer);
                }
                tds.push(Portal.Util.Format("<script type=\"text/html\" id=\"{0}\"><tr>", options.queryid));
                editTds.push(Portal.Util.Format("<script type=\"text/html\" id=\"{0}\"><tr>", options.editid));
                addTds.push("<tr data-bind=\"with:dataSource.edit\">");
                $.each(config, function (key, value) {
                    if (value.isshow == "1") {
                        tds.push(pageConfig.generateByElement.TD(value, language));
                    }
                    if (value.editvisible == "1") {
                        editTds.push(pageConfig.generateByElement[value.elementtype](value, language, "edit", "currentedit"));
                    }
                    else if (value.isshow == "1") {
                        editTds.push(pageConfig.generateByElement.TD(value, language));
                    }
                    if (value.addvisible == "1") {
                        addTds.push(pageConfig.generateByElement[value.elementtype](value, language, "edit", "edit"));
                    }
                });
                tds.push(typeof options.EditButton === "function" ? options.EditButton() : pageConfig.generateByElement.EditButton());
                editTds.push(typeof options.UpdateButton === "function" ? options.UpdateButton() : pageConfig.generateByElement.UpdateButton());
                addTds.push(typeof options.AddButton === "function" ? options.AddButton() : pageConfig.generateByElement.AddButton());
                tds.push("</tr><\/script>");
                editTds.push("</tr><\/script>");
                addTds.push("</tr>");
                templateContainer.append(tds.join(""));
                templateContainer.append(editTds.join(""));
                var containerParen = $(container).parent();
                containerParen.html("<!--ko template:{name:event.displayMode,foreach: dataSource.view}--><!--/ko-->");
                containerParen.append(addTds.join(""));
            },
            /**
            * 生成编辑区域的html,根据groupname进行分组
            */
            editGroupBy: function (config, container, language, count, vm) {
                var groups = new Array();
                $.each(config, function (key, value) {
                    if (value.editvisible == "1") {
                        if (!(value["groupname" + language] in groups)) {
                            groups[value["groupname" + language]] = new Array();
                        }
                        var group = groups[value["groupname" + language]];
                        group.push(pageConfig.generateByElement._labelRequired(value, language, "edit-header"));
                        if (value.editreadonly == "1") {
                            group.push(pageConfig.generateByElement.Label(value, language, "edit"));
                        } else {
                            group.push(pageConfig.generateByElement[value.elementtype](value, language, "edit", "edit"));
                        }
                    }
                });
                var n = 1;
                var div = $("<div data-bind=\"with:dataSource.edit\"/>");
                for (var group in groups) {
                    if (typeof vm !== "undefined") {
                        vm.dataSource.edit["group" + n] = ko.observable(n == 1);
                    }
                    var table = new Array();
                    table.push(Portal.Util.Format("<div style=\"margin-bottom:5px;\"><div style='text-align:left;'><div class=\"group-header\" data-bind=\"enableGroup:{0}\">{1}</div></div>\r\n", "group" + n, group));
                    table.push(Portal.Util.Format("<div class=\"group-content\" data-bind='visible:{0}'><table class=\"table edit\" align=\"center\"><tr style='height: 30px;'>", "group" + n++));
                    $.each(groups[group], function (key, value) {
                        table.push(value);
                        if (count != 0 && key != 0 && (key + 1) % (count * 2) == 0 && key != (groups[group].length - 1)) {
                            table.push("</tr>\r\n<tr style='height: 30px;'>");
                        }
                    });
                    table.push("</tr></table></div></div>");
                    div.append(table.join(""));
                };
                $(container).append(div);
            },
            /**
            * 生成列表的html
            */
            normalView: function (config, container, language, isCurd, options) {
                if (config !== undefined && config !== null && config.length > 0) {
                    var tds = new Array();
                    if (options.showSelect == true) {
                        tds.push("<td style='text-align:center'><input type=\"checkbox\" data-bind=\"checked:selected,click:$root.event.selectClick\" /></td>");
                    }
                    $.each(config, function (key, value) {
                        if (value.isshow == "1") {
                            tds.push(pageConfig.generateByElement.TD(value, language));
                        }
                    });
                    if (isCurd) {
                        tds.push(typeof options.EditButton === "function" ? options.EditButton() : pageConfig.generateByElement.EditButton());
                    }
                    $(container).append(tds.join(""));
                }
            },
            /**
            * 生成表头的html
            */
            normalHeader: function (config, container, language, isCurd, options) {
                if (config !== undefined && config !== null && config.length > 0) {
                    if (options.showSelect == true) {
                        $(container).append("<th style='text-align:center;width:80px;'></th>");
                    }
                    $(container).append(pageConfig.generateByElement.Header(language));
                    if (isCurd) {
                        $(container).append(typeof options.Action === "function" ? options.Action() : pageConfig.generateByElement.Action());
                    }
                }
            },
            /**
            * 生成查询条件的html
            */
            normalCondition: function (config, container, language, count) {
                var tds = new Array();
                tds.push("<table class=\"table condition\" data-bind=\"with:dataSource.condition\" align=\"left\"><tr>");
                var n = 0;
                $.each(config, function (key, value) {
                    if (value.iscondition == "1") {
                        tds.push(pageConfig.generateByElement._label(value, language, "condition-header"));
                        tds.push(pageConfig.generateByElement[value.elementtype](value, language, "condition", "condition"));
                        n++;
                        if (count != 0 && n % count == 0) {
                            tds.push("</tr><tr>");
                            n = 0;
                        }
                    }
                });
                if (n > 0) {
                    for (; n < count; n++) {
                        tds.push("<td class='condition-header'/><td/>");
                    }
                }
                tds.push("</tr></table>");
                $(container).append(tds.join(""));
            },
            /**
            * 生成分页的html
            */
            normalPage: function (config, container) {
                var pageTemplate = '<div class=\"row-fluid\">' +
                                            '<div style="float: left;color: Black">' +
                                                '<span style=\"float: left;\" data-bind=\"text:$root.language.pagemsg1\">' +
                                                '</span> ' +
                                                '<span style="float: left;color:#1cbbe5;margin:0 2px;" data-bind="text:page.recordCount">' +
                                                '</span> ' +
                                                '<span style="float: left;" data-bind="text:$root.language.pagemsg2">' +
                                                '</span> ' +
                                                '<span style=\"float: left;color:#1cbbe5;margin:0 2px;\" data-bind="text:page.pageIndex\">' +
                                                '</span> ' +
                                                '<span style=\"float: left; \">' +
                                                '/</span> ' +
                                                '<span style="float: left;color:#1cbbe5;margin:0 2px;\" data-bind=\"text:page.totalPages\">' +
                                                '</span> ' +
                                            '</div>' +
                                             '<div class="Pagination" style="margin-right:10px;float: right;color: Black">' +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.firstEnable,click:page.firstPage,text:$root.language.firstpage\">首页</button><button style=\"margin:0 4px;width: auto;\" disabled class=\"btn btn-link\"></button>" +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.prevEnable,click:page.prevPage,text:$root.language.prevpage\">上页</button><button style=\"margin:0 4px;width: auto;\" disabled class=\"btn btn-link\"></button>" +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.nextEnable,click:page.nextPage,text:$root.language.nextpage\">下页</button><button style=\"margin:0 4px;width: auto;\" disabled class=\"btn btn-link\"></button>" +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.lastEnable,click:page.lastPage,text:$root.language.lastpage\">末页</button>" +
                                             "</div>" +
                                        "</div>";
                var container = container ? container : $("#divPage");
                container.append(pageTemplate);
            },
            /**
            * 生成分页的html
            */
            diggPage: function (config, container) {
                var pageTemplate = '<div style=\"margin-bottom:5px;float:right;\">' +
                                            '<div class="dataTables_paginate paging_bootstrap pagination" style="float: right;color: Black">' +
                                                '<ul>' +
                                                    '<li class="customer-page-first" data-bind="click:page.firstPage">' +
                                                    '<p data-bind="text:$root.language.firstpage"></p></li>' +
                                                    '<li class="customer-page-prev" data-bind="click:page.prevPage">' +
                                                    '<p data-bind="text:$root.language.prevpage"></p></li>' +
                                                    '<!-- ko foreach:page.beforeIndexs-->' +
                                                    '<li data-bind="attr: {\'class\':cssclass},text:index,click:$root.page.jumpToIndex">' +
                                                    '</li>' +
                                                    '<!--/ko-->' +
                                                    '<li class="customer-page-ellipsis" data-bind="visible:page.isShowSplit"></li>' +
                                                    '<!-- ko foreach:page.afterIndexs-->' +
                                                    '<li data-bind="text:index,click:$root.page.jumpToIndex,attr: {\'class\':cssclass}">' +
                                                    '</li>' +
                                                    '<!--/ko-->' +
                                                    '<li class="customer-page-next" data-bind="click:page.nextPage">' +
                                                    '<p data-bind="text:$root.language.nextpage"></p></li>' +
                                                    '<li class="customer-page-last" data-bind="click:page.lastPage">' +
                                                    '<p data-bind="text:$root.language.lastpage"></p></li>' +
                                                '</ul>' +
                                            '</div>' +
                                            '<div class=\"dataTables_info\">' +
                                                '<span style=\"float: left;\" data-bind=\"text:$root.language.pagemsg1\">' +
                                                '</span>' +
                                                '<span style="float: left;margin:0 2px;color:#1cbbe5;" data-bind="text:page.recordCount">' +
                                                '</span>' +
                                                '<span style="float: left;" data-bind="text:$root.language.pagemsg2">' +
                                                '</span>' +
                                                '<span style=\"float: left;margin:0 2px;color:#1cbbe5;\" data-bind="text:page.pageIndex\">' +
                                                '</span>' +
                                                '<span style=\"float: left;\">' +
                                                '/</span>' +
                                                '<span style="float: left;margin:0 2px;color:#1cbbe5;\" data-bind=\"text:page.totalPages\">' +
                                                '</span>' +

                                            '</div>' +
                                        '</div>';
                var container = container ? container : $("#divPage");
                container.append(pageTemplate);
            }
        };
    })();
})(window);

//PageConfig.Text v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function () {
    window.PageConfig = window.PageConfig || {};
    window.PageConfig.Text = {};
    var text = window.PageConfig.Text;
    var dialogBigText;
    text.showEditBigText = function (valueAccessor) {
        var param = {
            height: 315,
            width: 400,
            modal: true,
            title: "编辑",
            position: ['middle'],
            resizable: true,
            open: function (event, ui) {
                var target = (event.currentTarget) ? event.currentTarget : event.target;
                $(target).dialog('widget').css({ position: 'fixed', '*position': 'absolute', top: '100px', '*top': '100px' });
            },
            buttons: [{
                text: "确定",
                click: function () {
                    valueAccessor(dialogBigText.find("#editValue").val());
                    $(this).dialog("close");
                }
            }]
        };
        if (typeof dialogBigText === "undefined") {
            dialogBigText = $("<div id='dialogBigText'><textarea id=\"editValue\" style='margin: 0;width: 95%;height: 90%;' cols=\"4\" rows=\"4\"></textarea></div>").dialog(param);
            dialogBigText.find("#editValue").val(valueAccessor());
        }
        else {
            dialogBigText.find("#editValue").val(valueAccessor());
            dialogBigText.dialog(param);
        }
    };
    var amountThousandth = function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var splitRegular = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g,
            decimalRegular = /^(\d+)((\.\d+)?)$/,
            value = valueAccessor(),
            newValue;
        if (typeof value === "function") {
            newValue = value();
        }
        else {
            newValue = value;
        }
        if (typeof newValue === "undefined" || newValue === null) {
            newValue = "";
        }
        newValue = newValue.toString().replace(/,/g, "");
        newValue = replaceFloat(newValue, 2);
        newValue = newValue.replace(decimalRegular, function (s, s1, s2) {
            return s1.replace(splitRegular, "$1,") + s2;
        });
        if (typeof value === "function") {
            value(newValue);
        }
        else {
            value = newValue;
        }
    };
    ko.bindingHandlers.bigText = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var accessor = valueAccessor();
            ko.utils.registerEventHandler(element, 'click', function () {
                text.showEditBigText(accessor);
            });
        }
    };
    ko.bindingHandlers.amountThousandth = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            amountThousandth(element, valueAccessor, allBindingsAccessor, viewModel);
            ko.utils.registerEventHandler(element, 'change', function () {
                amountThousandth(element, valueAccessor, allBindingsAccessor, viewModel);
            });
        }
    };
})();

//PageConfig.Datepicker v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function () {
    window.PageConfig = window.PageConfig || {};
    window.PageConfig.Datepicker = {};
    var datepicker = window.PageConfig.Datepicker;
    var DateStuff = function (element, currentModel) {
        this.element = element;
        this.currentModel = currentModel;
    }
    var dateArray = new Array();
    datepicker.formatDate = function (date, format) {
        var val = {
            d: date.getDate(),
            m: date.getMonth() + 1,
            yy: date.getFullYear().toString().substring(2),
            yyyy: date.getFullYear()
        };
        val.dd = (val.d < 10 ? '0' : '') + val.d;
        val.mm = (val.m < 10 ? '0' : '') + val.m;
        var date = [];
        for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
            date.push(val[format.parts[i]]);
        }
        return date.join(format.separator);
    };
    datepicker.parseDate = function (format) {
        var separator = format.match(/[.\/\-\s].*?/),
				parts = format.split(/\W+/);
        if (!separator || !parts || parts.length === 0) {
            throw new Error("Invalid date format.");
        }
        return { separator: separator, parts: parts };
    };
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
            dateArray.push(new DateStuff(element, valueAccessor()));
        }
    };

    datepicker.dateInit = function (startDate, endDate, dateIndex, dateType) {
        //DatePicker Config
        var dateConfig = {};
        if (typeof dateType !== "undefined" && dateType === "datetime") {
            dateConfig.minView = 0;
            dateConfig.format = "yyyy-mm-dd hh:ii";
        }
        else {
            dateConfig.minView = 2;
            dateConfig.format = "yyyy-mm-dd";
        }
        if (typeof dateIndex !== "undefined") {
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            dateConfig.startDate = dateIndex === "now" ? now : dateIndex;
        }
        if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
            $('#' + startDate).datetimepicker(dateConfig).on('changeDate', function (ev) {
                if (ev.date.valueOf() > $('#' + endDate).data().datetimepicker.date.valueOf()) {
                    $('#' + endDate).data().datetimepicker.reset();
                }
                $('#' + endDate).datetimepicker('setStartDate', ev.date);
            });

            $('#' + endDate).datetimepicker(dateConfig);
        }
        else {
            if (typeof startDate !== "undefined") {
                $('#' + startDate).datetimepicker(dateConfig);
            }
            if (typeof endDate !== "undefined") {
                $('#' + endDate).datetimepicker(dateConfig);
            }
        }
    };

    datepicker.getArray = function (objArray) {
        //分组之后的数组
        var tempArray = new Array();

        //全局属性数组
        var property = new Array();
        for (var i = 0; i < objArray.length; i++) {
            var p_len = property.length;
            var p_bool = true;
            for (var j = 0; j < p_len; j++) {
                if (property[j] == objArray[i].currentModel.group) {
                    p_bool = false;
                    break;
                }
            }
            if (p_bool) {
                property.push(objArray[i].currentModel.group);
                var group_name = "group_" + j;
                var group_name = new Array();
            }
            group_name.push(objArray[i]);
            tempArray[j] = group_name;
        }

        return tempArray;
    };

    datepicker.initDateFormat = function () {
        var currentArray = datepicker.getArray(dateArray);
        for (var i = 0; i < currentArray.length; i++) {
            //开始框ID 结束框ID 开始日期 时间格式
            var startId, endId, index, type;
            for (var j = 0; j < currentArray[i].length; j++) {
                var temp = currentArray[i][j].currentModel.tag;
                if (temp == "end") {
                    endId = currentArray[i][j].element.id;
                }
                else {
                    startId = currentArray[i][j].element.id;
                    if (typeof currentArray[i][j].currentModel.index !== "undefined") {
                        index = currentArray[i][j].currentModel.index;
                    }
                    else {
                        index = undefined;
                    }
                }

                if (typeof currentArray[i][j].currentModel.type !== "undefined") {
                    type = currentArray[i][j].currentModel.type;
                }
                else {
                    type = undefined;
                }
            }
            datepicker.dateInit(startId, endId, index, type);
        }
    };
})();

//PageConfig.Select v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
!(function () {
    /**
    * 新增ko绑定，用于绑定下拉框选中option的html值
    * data-bind="selectedName:obj"
    */
    ko.bindingHandlers.selectedName = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                ko.utils.arrayForEach(element.getElementsByTagName("option"), function (node) {
                    if (node.selected)
                        observable(node.innerText);
                });
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        }
    };

    var getSelectDataSource = function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = allBindingsAccessor()["optionsExtend"];
        if (options.dataType === "json") {
            var jsonData = options.bindTable;
            if (typeof jsonData !== "object") {
                eval("jsonData=" + jsonData);
            }
            if (typeof jsonData != "undefined" && jsonData != "") {
                allBindingsAccessor()["options"](jsonData);
            }
        }
        else {
            //根据表获取数据
            var para = {
                tableName: options.bindTable,
                dataType: options.dataType,
                filter: options.filter,
                orderby: options.orderBy
            };
            var filter = [];
            if (!PageConfig.Util.isNull(options.cascadeParent) && options.cascadeParent.length > 0) {
                $.each(options.cascadeParent, function () {
                    if (!PageConfig.Util.isNull(viewModel[this.parentfield]())) {
                        filter.push(this.filterfield + "='" + viewModel[this.parentfield]() + "'");
                    }
                });
                if (filter.length < 1)
                    return;
            }
            para.cascade = filter.join(" and ");

            $.post(Portal.Util.getRootPath() + "BPM/PageConfig/Handler/ParsingHandler.ashx", para, function (data) {
                allBindingsAccessor()["options"](data);
                //数据查回来并且绑定完回调方法
                var selectCallBack = allBindingsAccessor()["selectCallBack"];
                if (typeof selectCallBack === "function") {
                    selectCallBack(element, valueAccessor, allBindingsAccessor, viewModel);
                }
                var options = allBindingsAccessor()["optionsExtend"];
                if (typeof window[options.callBack] === "function") {
                    window[options.callBack]();
                }
                else if (!PageConfig.Util.isNull(options.callBack)) {
                    eval("var selectCallBack=" + options.callBack);
                    if (typeof selectCallBack === "function") {
                        selectCallBack(element, valueAccessor, allBindingsAccessor, viewModel);
                    }
                }
            });
        }
    };
    ko.bindingHandlers.optionsExtend = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            getSelectDataSource(element, valueAccessor(), allBindingsAccessor, viewModel);
            var options = allBindingsAccessor()["optionsExtend"];
            if (!PageConfig.Util.isNull(options.childField)) {
                ko.utils.registerEventHandler(element, "change", function () {
                    if (typeof viewModel["trigger" + options.childField] === "undefined") {
                        viewModel["trigger" + options.childField] = ko.observable();
                    }
                    viewModel["trigger" + options.childField]("trigger" + (new Date()).valueOf());
                });
            }
        }
    };

    ko.bindingHandlers.triggerField = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var oldValue = $(element).attr("oldValue");
            var newValue = valueAccessor()();
            if (oldValue !== newValue) {
                $(element).attr("oldValue", newValue);
                getSelectDataSource(element, valueAccessor(), allBindingsAccessor, viewModel);
            }
        }
    };
})();

//PageConfig.Group v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function () {
    ko.bindingHandlers.enableGroup = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.registerEventHandler(element, "click", function () {
                var value = valueAccessor();
                value(!value());
            });
        }
    };
})();

//PageConfig.Dialog v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function (window) {
    if (typeof window.PageConfig === "undefined")
        window.PageConfig = {};
    var pageConfig = window.PageConfig;
    pageConfig.Dialog = pageConfig.Dialog || {};
    var util = window.Portal.Util;

    var dialogVMs = {};
    var htmlTemplate =
                '<div>                                                                                                                                                   ' +
                '    <table style="text-align: center; float: left;width:80%;">                                                                                        ' +
                '        <tbody>                                                                                                                                         ' +
                '            <tr id="{0}">                                                                                                                               ' +
                '            </tr>                                                                                                                                       ' +
                '        </tbody>                                                                                                                                        ' +
                '    </table>                                                                                                                                            ' +
                '    <div style="padding-left: 2px; float: left;width:19%;*margin-top: 2px;">                                                                                      ' +
                '        <input  type="button"  data-bind="click: function(){page.query(1);},value:$root.language.query" />                                               ' +
                '        <input type="button"   data-bind="click:event.clearConditionData,value:$root.language.clear" />                                                  ' +
                '    </div>                                                                                                                                              ' +
                '</div>                                                                                                                                                  ' +
                '<div id="{1}" style="clear: both">                                                                                                                      ' +
                '</div>                                                                                                                                                  ' +
                '<div>                                                                                                                                                   ' +
                '    <div style="overflow: auto;width:100%;height:auto;">                                                                                                                     ' +
                '        <table id="tableContent" class="table" style="margin-bottom:2px;">                                                                       ' +
                '            <thead>                                                                                                                                     ' +
                '                <tr id="{2}">                                                                                                                           ' +
                '                </tr>                                                                                                                                   ' +
                '            </thead>                                                                                                                                    ' +
                '            <tbody>                                                                                             ' +
                '            <!--ko foreach: dataSource.view-->                                                                                             ' +
                '                <tr id="{3}"></tr>                                                                                                                      ' +
                '            <!--/ko-->                                                                                                                                   ' +
                '            </tbody>                                                                                                                                    ' +
                '        </table>                                                                                                                                        ' +
                '    </div>                                                                                                                                              ' +
'<div  style="margin-top: 5px"><button data-bind="click:event.ok,text:$root.language.ok"></button>' +
                '<button data-bind="click:event.cancel,text:$root.language.cancel"></button></div>' +
                '</div>                                                                                                                                                  ';
    var normalView = function (config, container, language, isCurd, isMulti) {
        if (config !== undefined && config !== null && config.length > 0) {
            var tds = new Array();
            var checkboxTemplate = "<td style='text-align:center'><input type=\"checkbox\" data-bind=\"checked:selected,click:$root.event.selectClick\" /></td>";
            var radioTemplate = "<td style='text-align:center'><input type=\"radio\" name='Selected' data-bind=\"value:{0}(),checked:$root.selected,click:$root.event.selectClick\" /></td>";
            if (!isMulti) {
                var valueField = "";
                $.each(config, function (key, value) {
                    if (value.isprimarykey == "1") {
                        valueField = value.fieldname;
                        return;
                    }
                });
                tds.push(util.Format(radioTemplate, valueField));
            }
            else {
                tds.push(checkboxTemplate);
            }
            $.each(config, function (key, value) {
                if (value.isshow == "1") {
                    tds.push(pageConfig.generateByElement.TD(value, language));
                }
            });
            if (isCurd) {
                tds.push(pageConfig.generateByElement.EditButton());
            }
            $(container).append(tds.join(""));
        }
    };
    var normalHeader = function (config, container, language, isCurd) {
        if (config !== undefined && config !== null && config.length > 0) {
            var ths = new Array();
            $(container).append("<th style='width:8%;'></th>");
            $(container).append(pageConfig.generateByElement.Header(language));
            if (isCurd) {
                $(container).append(pageConfig.generateByElement.Action());
            }
        }
    };

    //基本弹出框
    pageConfig.Dialog.SelectBase = function (options, isMulti) {
        var baseUrl = Portal.Util.getRootPath() + "BPM/PageConfig/Handler/QueryCommonHandler.ashx?pname=" + options.dataSource + "&sourcetype=" + options.sourceType + "&";
        if (typeof isMulti === "undefined") {//判断是否多选
            isMulti = false;
        }
        //先判断是否第一次调用弹出框
        var container = $("#" + options.dialogId);
        if (container.length == 0) {
            container = $(util.Format("<div style='overflow: auto;' id='{0}'/>", options.dialogId));
            container.append(util.Format(htmlTemplate, options.conditionId, options.pageId, options.headTrId, options.bodyTrId));
            $.ajax({
                url: baseUrl + "&req=init",
                type: "get",
                cache: false,
                async: false,
                success: function (data) {
                    var valueField;
                    $.each(data.pageconfigfields, function (key, value) {
                        if (value.isprimarykey == "1") {
                            valueField = value.fieldname;
                            return;
                        }
                    });
                    var curd = new PageConfig.Engine.Query({ config: data.pageconfigfields, baseUrl: baseUrl,
                        conditionNumberPerRow: data.pageconfig.conditionnumberperrow,
                        isGenerateHtml: false,
                        isCURD: false,
                        isPage: options.isPage,
                        pageSize: options.pageSize,
                        language: data.language,
                        orderByField: data.pageconfig.orderbyfield,
                        conditionNumberPerRow: data.pageconfig.conditionnumberperrow,
                        isAsc: data.pageconfig.isasc == 1,
                        queryUrlAccessor: function (vm, param) {
                            param.filter = options.filter;
                            return true;
                        },
                        queryCallBack: function () {
                            $.each(curd.dataSource.view(), function (key, value) {
                                $.each(curd.selects, function (key2, value2) {
                                    if (value2[valueField]() == value[valueField]()) {
                                        value.selected(true);
                                    }
                                });

                            });
                            return true;
                        }
                    });
                    //生成html
                    normalHeader(data.pageconfigfields, container.find("#" + options.headTrId), data.language, false);
                    normalView(data.pageconfigfields, container.find("#" + options.bodyTrId), data.language, false, isMulti);
                    PageConfig.generateTemplate.normalCondition(data.pageconfigfields, container.find("#" + options.conditionId), data.language, 5);
                    if (options.isPage)
                        PageConfig.generateTemplate.normalPage(data.pageconfigfields, container.find("#" + options.pageId));
                    //回调方法
                    curd.callBack = options.callBack;
                    //保存当前选中的radio box 的value
                    curd.selected = ko.observable(-1);
                    curd.selects = [];
                    //确定方法
                    curd.event.ok = function () {
                        var datas = curd.selects;
                        if (datas.length > 0) {
                            if (typeof options.callBack === "function") {
                                options.callBack(datas);
                            }
                            else {
                                var fieldMap = options.fieldMap;
                                var values = {};
                                $.each(datas, function (key, value) {
                                    for (var p in fieldMap) {
                                        var targetField = fieldMap[p];
                                        if (typeof values[targetField] === "undefined") {
                                            values[targetField] = [];
                                        }
                                        values[targetField].push(value[p]());
                                    }
                                });
                                for (var p in values) {
                                    options.parentVm[p](values[p].join(";"));
                                }
                            }
                            container.dialog("close");
                        }
                        else {
                            Portal.Util.alert(2, "请选择");
                        }
                    };
                    //取消方法
                    curd.event.cancel = function () { container.dialog("close"); };
                    //选中时触发的事件
                    curd.event.selectClick = function (data) {
                        if (!isMulti) {
                            data.selected(true);
                            $.each(curd.dataSource.view(), function () {
                                if (this != data) {
                                    this.selected(false);
                                }
                            });
                            curd.selects = [];
                            curd.selects.push(data);
                        }
                        else {
                            if (data.selected()) {
                                curd.selects.push(data); //添加进数组
                            }
                            else {
                                curd.selects.splice($.inArray(data, curd.selects), 1); //从数组中移除 
                            }
                        }
                        return true;
                    };
                    dialogVMs[options.dialogId] = curd;
                    curd.page.parent = curd;
                    //弹出框标题
                    options.title = data.pageconfig["title" + data.language];
                    ko.applyBindings(curd, container[0]);
                    curd.page.query(1);
                }
            });
            var param = {
                height: options.height,
                width: options.width,
                modal: true,
                title: options.title,
                position: ['middle'],
                resizable: false,
                open: function (event, ui) {
                    var target = (event.currentTarget) ? event.currentTarget : event.target;
                    $(target).dialog('widget').css({ position: 'fixed', '*position': 'absolute', top: '2px', '*top': '2px' });
                }
            };
            container.dialog(param);
        }
        else {
            dialogVMs[options.dialogId].selected(undefined);
            dialogVMs[options.dialogId].event.clearConditionData();
            dialogVMs[options.dialogId].selects = [];
            container.dialog();
        }

    };
    //创建选人弹出框
    //@callBack 回调函数
    //@dialogOption 弹出框的配置，用于覆盖默认的配置
    //@isMulti 是否可以多选
    pageConfig.Dialog.OpenDialog = function (element, valueAccessor, allBingdsAccessor, viewModel) {
        var dialogArray = valueAccessor();
        var dialogId = $(element).attr("dialogId");
        if (typeof dialogId === "undefined") {
            dialogId = newGuid();
            $(element).attr("dialogId", dialogId);
        }
        var callback = dialogArray.callBack;
        var isMulti = dialogArray.isMulti; //弹出框是否多选
        var datasource = dialogArray.datasource;
        var sourcetype = dialogArray.sourcetype;
        var title = dialogArray.title;
        var width = dialogArray.width;
        var height = dialogArray.height;
        var valuefield = dialogArray.valuefield;
        var idfield = dialogArray.idfield;
        var pageSize = dialogArray.pageSize;
        var config = {
            dialogId: dialogId, //设置弹出框最顶层element的ID
            conditionId: dialogId + "Condition", //设置查询条件的element id
            pageId: dialogId + "Page", //设置分页的element id
            headTrId: dialogId + "HeadTr", //设置列头的element id
            bodyTrId: dialogId + "BodyTr", //设置列内容的element id
            dataSource: datasource, //弹出框列表数据源
            sourceType: sourcetype != undefined ? sourcetype : "table",
            callBack: callback, //回调函数
            title: title != undefined ? title : "弹出框：" + dialogId, //弹出框的标题
            width: width != undefined ? width : "950", //弹出框宽度
            height: height != undefined ? height : "430", //弹出框高度
            valueField: valuefield,
            isPage: dialogArray.isPage,
            pageSize: pageSize != undefined ? pageSize : 10,
            idField: idfield,
            parentVm: viewModel, //弹出框父页面的view model
            filter: dialogArray.filter,
            fieldMap: allBingdsAccessor()["fieldMap"]
        };
        PageConfig.Dialog.SelectBase(config, isMulti);
    };
})(window);

ko.bindingHandlers.dialog = {
    init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        ko.utils.registerEventHandler(element, "click", function () {
            PageConfig.Dialog.OpenDialog(element, valueAccessor, allBingdsAccessor, viewModel);
        });
    },
    update: function (element, valueAccessor, allBingdsAccessor, viewModel) {

    }
};

ko.bindingHandlers.configDialog = {
    init: function (element, valueAccessor, allBingdsAccessor, viewModel) {
        if (window.webConfig.dialogtype != undefined && window.webConfig.dialogtype == 0) {
            ko.utils.registerEventHandler(element, "click", function () {
                var dialogArray = valueAccessor();
                var callback = dialogArray.callBack;
                var isMulti = dialogArray.isMulti != undefined ? dialogArray.isMulti : false; //弹出框是否多选
                dialogExtend.selectUser(callback, null, isMulti);
            });
        }
        else {
            ko.utils.registerEventHandler(element, "click", function () {
                PageConfig.Dialog.OpenDialog(element, valueAccessor, allBingdsAccessor, viewModel);
            });
        }
    },
    update: function (element, valueAccessor, allBingdsAccessor, viewModel) {

    }
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//PageConfig v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery,jquery ui library
//设置默认不缓存
$.ajaxSettings.cache = false;
/**
* @option                           
* @option.searchContainer           查询条件容器，默认值（$("#conditionDiv")）
* @option.searchGenerateFunc        生成查询条件html方法，默认值（PageConfig.generateTemplate.normalCondition）
* @option.conditionNumberPerRow     查询条件每行列数，默认值（5）
* @option.editContainer              编辑容器，默认值（$("#editDiv")）
* @option.editGenerateFunc           生成编辑html方法，默认值（PageConfig.generateTemplate.normalEdit）
* @option.editNumberPerRow          编辑每行列数，默认值（5）
* @option.viewContainer             列表容器，默认值（$("#viewTr")）
* @option.viewGenerateFunc          生成列表html方法，默认值（PageConfig.generateTemplate.normalView）
* @option.headerContainer           表头容器，默认值（$("#headerTr")）
* @option.headerGenerateFunc        生成表头html方法，默认值（PageConfig.generateTemplate.normalHeader）
* @option.pageContainer             分页容器，默认值（$("#pageDiv")）
* @option.pageGenerateFunc          生成分页html方法，默认值（PageConfig.generateTemplate.diggPage）
* @option.language                  多语言简码，默认值（"ch"）
* @option.isCURD                    是否显示操作列，默认值（false）
* @option.isGenerateHtml            是否自动生成html，默认值（true）
* @option.orderfield           默认排序字段(可选)
* @option.isAsc                     排序方式，正序（true）或者倒序（false），默认值（true）
* @option.baseUrl                   增删改查的url（必须）
* @option.autoQuery                 重置条件时是否自动查询，默认值（true）
* @option.pageType                  分页样式，支持两种风格，默认值（1）
* @option.pageSize                  每页显示的数量，默认值（10）
*/
(function (PageConfig) {
    PageConfig = PageConfig || {};
    PageConfig.Engine = PageConfig.Engine || {};
    /**
    * 生成条件html
    * @options
    *
    */
    PageConfig.Engine.generateConditionHTML = function (options) {
        var container = options.searchContainer || $("#conditionDiv");
        var generateHtml = options.searchGenerateFunc || PageConfig.generateTemplate.normalCondition;
        generateHtml(options.config, container, options.language || "ch", options.conditionNumberPerRow || 4);
    };
    /**
    * 生成新增html
    * @options
    *
    */
    PageConfig.Engine.generateEditHTML = function (options, vm) {
        var container = options.editContainer || $("#editDiv");

        var generateHtml;
        if (typeof options.editGenerateFunc === "function") {
            generateHtml = options.editGenerateFunc;
        }
        else if (typeof options.enableGroup !== "undefined" && options.enableGroup === 1) {
            generateHtml = PageConfig.generateTemplate.editGroupBy;
        }
        else {
            generateHtml = PageConfig.generateTemplate.normalEdit;
        }
        generateHtml(options.config, container, options.language || "ch", options.editNumberPerRow || 4, vm);
    };
    /**
    * 生成列表tbody的html
    * @options
    *
    */
    PageConfig.Engine.generateViewHTML = function (options) {
        var container = options.viewContainer || $("#viewTr");
        var generateHtml; //= options.viewGenerateFunc || PageConfig.generateTemplate.normalView;
        if (typeof options.viewGenerateFunc === "function") {
            generateHtml = options.viewGenerateFunc
        }
        else if (options.currentEdit == 1) {
            generateHtml = PageConfig.generateTemplate.currentEdit;
        }
        else {
            generateHtml = PageConfig.generateTemplate.normalView;
        }
        generateHtml(options.config, container, options.language || "ch", options.isCURD, options);
    };
    /**
    * 生成列表头html
    * @options
    *
    */
    PageConfig.Engine.generateHeaderHTML = function (options) {
        var container = options.headerContainer || $("#headerTr");
        var generateHtml = options.headerGenerateFunc || PageConfig.generateTemplate.normalHeader;
        generateHtml(options.config, container, options.language || "ch", options.isCURD, options);
    };
    /**
    * 生成html
    * @options
    *
    */
    PageConfig.Engine.generatePageHTML = function (options) {
        var container = options.pageContainer || $("#pageDiv");
        var generateHtml = options.pageGenerateFunc || PageConfig.generateTemplate.diggPage;
        generateHtml(options.config, container);
    };
    PageConfig.Engine.generateHTML = function (options) {
        PageConfig.Engine.generateConditionHTML(options);
        PageConfig.Engine.generateEditHTML(options);
        PageConfig.Engine.generateViewHTML(options);
        PageConfig.Engine.generateHeaderHTML(options);
        PageConfig.Engine.generatePageHTML(options);
    };
    /**
    * 多语言-公共部门
    */
    PageConfig.Engine.Language = (function () {
        return {
            "ch": {
                empty: "没有记录.",
                firstpage: "首页",
                lastpage: "末页",
                nextpage: "下一页",
                pagemsg2: "条记录    页次:",
                pagemsg1: "共",
                prevpage: "上一页",
                action: "操作",
                optionscaption: "--请选择--",
                add: "新增",
                edit: "编辑",
                clear: "重置",
                update: "更新",
                save: "保存",
                cancel: "取消",
                remove: "删除",
                removeWarm: "是否删除该条记录？",
                enableWarm: "是否启用该条记录？",
                disableWarm: "是否禁用该条记录？",
                enable: "启用",
                disable: "禁用",
                ok: "确定",
                query: "查询",
                editfield: "编辑字段",
                html: "Html",
                generateUrl: "URL",
                preview: "预览",
                exportExcel: "导出Excel",
                exportCSV: "导出CVS",
                exportPDF: "导出PDF"
            },
            "en": {
                empty: "No record(s) found.",
                firstpage: "First",
                lastpage: "Last",
                nextpage: "Next",
                pagemsg2: "Record    Page:",
                pagemsg1: "Total",
                prevpage: "Prev",
                action: "Action",
                optionscaption: " --Please Select--",
                add: "Add",
                edit: "Edit",
                clear: "Reset",
                update: "Update",
                save: "Save",
                cancel: "Cancel",
                remove: "Delete",
                removeWarm: "Whether to delete this recor？",
                enableWarm: "Whether to enable this record？",
                disableWarm: "Whether to disable this record？",
                enable: "Enable",
                disable: "Disabled",
                ok: "OK",
                query: "Search",
                editfield: "Edit Field",
                html: "Html",
                generateUrl: "URL",
                preview: "Preview",
                exportExcel: "Export Excel",
                exportCSV: "Export CVS",
                exportPDF: "Export PDF"
            },
            "tw": {
                empty: "沒有記錄.",
                firstpage: "首頁",
                lastpage: "末頁",
                nextpage: "下一頁",
                pagemsg2: "條記錄    頁次：",
                pagemsg1: "共",
                prevpage: "上一頁",
                action: "操作",
                optionscaption: "--請選擇--",
                add: "新增",
                edit: "編輯",
                clear: "重置",
                update: "更新",
                save: "保存",
                cancel: "取消",
                remove: "刪除",
                removeWarm: "是否刪除該條記錄？",
                enableWarm: "是否啟用該條記錄？",
                disableWarm: "是否禁用該條記錄",
                enable: "啟用",
                disable: "禁用",
                ok: "確定",
                query: "查詢",
                editfield: "編輯欄位",
                html: "Html",
                generateUrl: "URL",
                preview: "預覽",
                exportExcel: "導出 Excel",
                exportCSV: "導出 CVS",
                exportPDF: "導出 PDF"
            },
            "jp": {
                empty: "レコードがありません.",
                firstpage: "トップに戻る",
                lastpage: "最後",
                nextpage: "次へ",
                pagemsg2: "件　　ページ：",
                pagemsg1: "件数",
                prevpage: "前へ",
                action: "操作",
                optionscaption: "選択してください",
                add: "追加",
                edit: "編集",
                clear: "リセット",
                update: "更新",
                save: "保存",
                cancel: "取消",
                remove: "削除",
                removeWarm: "このレコードを削除しますか？",
                enableWarm: "このレコードを使用しますか？",
                disableWarm: "このレコードを禁止使用しますか？",
                enable: "スタート",
                disable: "禁止",
                ok: "確定",
                query: "検索",
                editfield: "フィールド編集",
                html: "Html",
                generateUrl: "URL",
                preview: "プレビュー",
                exportExcel: "輸出 Excel",
                exportCSV: "輸出 CVS",
                exportPDF: "輸出 PDF"
            }
        };
    })();
    /**
    * 分页
    * @options
    *
    */
    PageConfig.Engine.Page = function (options, vm) {
        var self = this;
        var isPage = (typeof options.isPage === "undefined" || options.isPage) ? true : false;
        //生成html
        if ((typeof options.isGenerateHtml === "undefined" || options.isGenerateHtml) && isPage) {
            PageConfig.Engine.generatePageHTML(options);
        }
        //分页样式
        self.pageType = options.pageType || "1";
        //获取数据地址
        self.baseUrl = options.baseUrl + "req=query&";
        //
        self.vm = vm;
        //当前页索引
        self.pageIndex = ko.observable(1);
        //总页数
        self.totalPages = ko.observable(1);
        //总记录数
        self.recordCount = ko.observable(0);
        //每页显示几条记录
        self.pageSize = ko.observable(options.pageSize ? options.pageSize : 10);
        //拼接url的参数
        self.queryUrlAccessor = options.queryUrlAccessor;
        //跳转到第几页
        self.jumpToIndex = function (data) {
            self.query(data.index());
        };
        self.firstEnable = ko.observable(true);
        self.prevEnable = ko.observable(true);
        self.nextEnable = ko.observable(true);
        self.lastEnable = ko.observable(true);
        //
        self.beforeIndex = 3;
        self.afterIndex = 1;
        self.beforeIndexs = ko.observableArray();
        self.afterIndexs = ko.observableArray();
        self.oldIndex = 1;
        self.isShowSplit = ko.observable(false);
        self.calculateIndexs = function (pageIndex, totalpages) {
            var before = self.beforeIndex,
                after = self.afterIndex,
                afterMin = totalpages - after + 1,
                afterMax = totalpages,
                middle = afterMin - 2,
                beforeMin = 0,
                beforeMax = 0;
            self.isShowSplit(false);
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
                self.isShowSplit(true);
            }
            self.beforeIndexs.removeAll();
            self.afterIndexs.removeAll();
            for (; beforeMin <= beforeMax && beforeMax > 0; beforeMin++) {
                self.beforeIndexs.push({ index: ko.observable(beforeMin), cssclass: ko.observable("") });
            }
            for (; afterMin <= afterMax && afterMax > 0; afterMin++) {
                self.afterIndexs.push({ index: ko.observable(afterMin), cssclass: ko.observable("") });
            }
        };
        self.changeIndexCss = function (index) {
            $.each(self.beforeIndexs(), function () {
                if (index != this.index()) {
                    this.cssclass("customer-page-normal");
                }
                else {
                    this.cssclass("customer-page-active");
                }
            });
            $.each(self.afterIndexs(), function () {
                if (index != this.index()) {
                    this.cssclass("customer-page-normal");
                }
                else {
                    this.cssclass("customer-page-active");
                }
            });
        };
        //查询
        self.queryBefore = options.queryBefore;
        self.queryAfter = options.queryAfter;
        self.queryCallBack = options.queryCallBack;
        self.query = function (pageIndex) {
            pageIndex = pageIndex || 1;
            var orderfield = vm.option.orderByField;
            self.pageIndex(pageIndex);
            var param = {
                pageindex: self.pageIndex(),
                pagesize: self.pageSize(),
                orderby: orderfield,
                isasc: vm.option.isAsc(),
                ispage: isPage ? 1 : 0
            };
            if (typeof vm.dataSource.condition !== "undefined") {
                $.each(options.config, function (key, value) {
                    if (this.iscondition == "1") {
                        param[value.fieldname] = vm.dataSource.condition[value.fieldname]();
                        if (this.elementtype == 'DateRange') {
                            param[value.fieldname + "1"] = vm.dataSource.condition[value.fieldname + "1"]();
                        }
                    }
                });
            }
            PageConfig.Util.validAndExecuteFunction(self.queryUrlAccessor, vm, param);
            if (PageConfig.Util.validAndExecuteFunction(self.queryBefore, param)) {
                $.ajax({
                    url: Portal.Util.appendQueryString(self.baseUrl, param),
                    type: "GET",
                    cache: false,
                    success: function (result) {
                        if (PageConfig.Util.validAndExecuteFunction(self.queryAfter, result)) {
                            vm.dataSource.view.removeAll();
                            if (result.data !== undefined && result.data !== null) {
                                $.each(result.data, function (key, value) {
                                    var row = PageConfig.Util.foreachProperty(value);
                                    row.editing = ko.observable(false);
                                    row.selected = ko.observable(false);
                                    vm.dataSource.view.push(row);
                                });
                                if (result.data.length == 0) {
                                    self.pageIndex(1);
                                }
                            }
                            else {
                                self.pageIndex(1);
                            }


                            if (isPage) {
                                if (self.pageType == "1") {
                                    self.calculateIndexs(pageIndex, result.totalpages);
                                    self.changeIndexCss(pageIndex);
                                }
                                self.totalPages(result.totalpages == 0 ? 1 : result.totalpages);
                                self.recordCount(result.recordcount);
                            }
                            $.each(vm.dataSource.view(), function (key, value) {
                                $.each(vm.selecteds(), function (key2, value2) {
                                    if (value2[vm.primarykeyFiled]() == value[vm.primarykeyFiled]()) {
                                        value.selected(true);
                                    }
                                });

                            });
                            PageConfig.Util.validAndExecuteFunction(self.queryCallBack, vm.dataSource.view());
                            pageIndex = self.pageIndex();
                            if (pageIndex <= 1) {
                                self.firstEnable(false);
                                self.prevEnable(false);
                            }
                            else {
                                self.firstEnable(true);
                                self.prevEnable(true);
                            }
                            if (pageIndex < self.totalPages()) {
                                self.nextEnable(true);
                                self.lastEnable(true);
                            }
                            else {
                                self.nextEnable(false);
                                self.lastEnable(false);
                            }
                        }
                    }
                });
            }
        };

        self.exportData = function (type) {
            type = type || "excel";
            var orderfield = vm.option.orderByField;
            //orderfield = PageConfig.Util.isNull(orderfield) ? vm.option.defaultOrderBy : orderfield;
            var param = {
                orderby: orderfield,
                type: type,  //1:excel  2:csv 3:pdf
                isasc: vm.option.isAsc()
            };
            if (typeof vm.dataSource.condition !== "undefined") {
                $.each(options.config, function (key, value) {
                    if (this.iscondition == "1") {
                        param[value.fieldname] = vm.dataSource.condition[value.fieldname]();
                        if (this.elementtype == 'DatePickerRange') {
                            param[value.fieldname + "1"] = vm.dataSource.condition[value.fieldname + "1"]();
                        }
                    }
                });
            }
            PageConfig.Util.validAndExecuteFunction(self.queryUrlAccessor, vm, param);
            if (PageConfig.Util.validAndExecuteFunction(self.queryBefore, param)) {
                window.open(Portal.Util.appendQueryString(options.baseUrl + "req=export&", param));
            }
        };

        //第一页
        self.firstPage = function () {
            if (self.pageIndex() <= 1)
                return;
            var newPageIndex = 1;
            self.query(newPageIndex);
        };
        //上一页
        self.prevPage = function () {
            if (self.pageIndex() <= 1)
                return;
            var newPageIndex = self.pageIndex() - 1;
            self.query(newPageIndex);
        };
        //下一页
        self.nextPage = function () {
            if (self.pageIndex() >= self.totalPages())
                return;
            var newPageIndex = self.pageIndex() + 1;
            self.query(newPageIndex);
        };
        //最后一页
        self.lastPage = function () {
            if (self.pageIndex() >= self.totalPages())
                return;
            var newPageIndex = self.totalPages();
            self.query(newPageIndex);
        };
    };
    /**
    * 只创建查询
    * @options
    *
    */
    PageConfig.Engine.Query = function (opt) {
        if (typeof opt === "undefined" || typeof opt.config === "undefined")
            return undefined;

        var self = this;
        var option = {
            baseUrl: "",
            reqs: {
                add: "add", //新增
                update: "update", //更新
                remove: "delete", //删除
                query: "query", //查询
                enable: "enable", //启用
                disable: "disable"//禁用
            },
            currentEdit: 0,
            queryid: "query",
            editid: "edit",
            autoQuery: true, //自动查询
            orderByField: undefined //排序字段
        };
        $.extend(option, opt);
        self.primarykeyFiled;
        self.selecteds = ko.observableArray(); ;
        //生成html
        if (typeof opt.isGenerateHtml === "undefined" || opt.isGenerateHtml) {
            PageConfig.Engine.generateHeaderHTML(option);
            PageConfig.Engine.generateConditionHTML(option);
            PageConfig.Engine.generateViewHTML(option);
        }
        //顺序或倒序
        option.isAsc = ko.observable(typeof option.isAsc === "undefined" ? true : option.isAsc);
        self.option = option;
        //
        var dataSource = {};
        //列表数据
        dataSource.view = ko.observableArray();
        //列表头
        dataSource.headers = ko.observableArray();
        //下拉框数据源
        dataSource.select = {};
        //条件数据
        dataSource.condition = {};
        $.each(option.config, function (key, value) {
            if (typeof value.iscondition !== "undefined" && value.iscondition == 1) {

                if (value.elementtype === 'Select') {
                    dataSource.select["condition" + value.fieldname] = ko.observableArray();
                    dataSource.condition[value.fieldname] = ko.observable();
                    if (!PageConfig.Util.isNull(value.optionstextfield))
                        dataSource.condition[value.optionstextfield] = ko.observable();
                    if (!PageConfig.Util.isNull(value.datasource)) {
                        eval("var conf=" + value.datasource);
                        if (!PageConfig.Util.isNull(conf.cascadeParent)) {
                            dataSource.condition["trigger" + value.fieldname] = ko.observable();
                        }
                    }
                }
                else if (value.elementtype === 'Dialog' ||
                        value.elementtype === 'DialogGroup' ||
                        value.elementtype === 'DialogRole' ||
                        value.elementtype === 'DialogUser') {
                    dataSource.condition[value.fieldname] = ko.observable();
                    dataSource.condition[value.optionstextfield] = ko.observable();
                    if (!PageConfig.Util.isNull(value.optionsvaluefield)) {
                        eval("var fieldMap=" + value.optionsvaluefield);
                        for (var p in fieldMap) {
                            dataSource.condition[fieldMap[p]] = ko.observable();
                        }
                    }
                }
                else if (value.elementtype == 'DateRange') {
                    dataSource.condition[value.fieldname] = ko.observable();
                    dataSource.condition[value.fieldname + "1"] = ko.observable();
                }
                else {
                    dataSource.condition[value.fieldname] = ko.observable();
                }
            }
            //列表头
            if (typeof value.isshow !== "undefined" && value.isshow == "1") {
                var obj = {};
                obj.width = value.width;
                obj.display = value["display" + option.language];
                obj.displaych = value.displaych;
                obj.displayen = value.displayen;
                obj.displayjp = value.displayjp;
                obj.displaytw = value.displaytw;
                obj.issort = value.issort;
                obj.fieldname = value.fieldname;
                if (typeof value.issort !== "undefined" && value.issort == "0") {
                    obj.headerClass = ko.observable("table-sort-normal");
                }
                else {
                    obj.headerClass = ko.observable(typeof option.orderByField !== "undefined" && value.fieldname == option.orderByField.toLowerCase() ? (option.isAsc() ? "table-sort-uparrow" : "table-sort-downarrow") : "");
                }

                dataSource.headers.push(obj);
            }
            if (value.isprimarykey == "1") {
                self.primarykeyFiled = value.fieldname;
            }
        });
        self.dataSource = dataSource;
        //多语言
        self.language = PageConfig.Engine.Language[option.language || "ch"];
        //分页
        self.page = new PageConfig.Engine.Page(opt, self);
        //
        var event = {};
        //重置查询条件
        event.clearConditionData = function () {
            var conditionData = dataSource.condition;
            if (PageConfig.Util.validAndExecuteFunction(event.clearConditionBefore, conditionData)) {
                $.each(option.config, function (key, value) {
                    if (value.elementtype == "Select" || value.elementtype == "Dialog"
                    || value.elementtype == "DialogUser"
                        || value.elementtype == "DialogRole"
                        || value.elementtype == "DialogGroup") {
                        PageConfig.Util.setUndefined(conditionData[value.fieldname]);
                        PageConfig.Util.setUndefined(conditionData[value.optionstextfield]);
                        if (!PageConfig.Util.isNull(value.datasource)) {
                            eval("var conf=" + value.datasource);
                            if (!PageConfig.Util.isNull(conf.cascadeParent)) {
                                dataSource.select["condition" + value.fieldname]([]);
                            }
                        }
                    }
                    else if (value.elementtype == "DateRange") {
                        PageConfig.Util.setUndefined(conditionData[value.fieldname]);
                        PageConfig.Util.setUndefined(conditionData[value.fieldname + "1"]);
                    }
                    else {
                        PageConfig.Util.setUndefined(conditionData[value.fieldname]);
                    }
                });
                PageConfig.Util.validAndExecuteFunction(event.clearConditionAfter, conditionData);
            }
            if (option.autoQuery) {
                self.page.query(1);
            }
        };
        //排序
        event.sort = function (data) {
            if (typeof data.issort !== "undefined" && data.issort == "0") {
                return;
            }
            //判断是否为当前列排序，如果是将排序方式颠倒，如果不是，设置为正序排列
            if (option.orderByField.toLowerCase() == data.fieldname) {
                option.isAsc(!option.isAsc());
            }
            else {
                option.isAsc(true);
            }
            //设置排序的图标
            if (option.isAsc()) {
                data.headerClass("table-sort-uparrow");
            }
            else {
                data.headerClass("table-sort-downarrow");
            }
            //去掉未排序列的图标
            $.each(dataSource.headers(), function (key, value) {
                if (value != data) {
                    if (typeof value.issort !== "undefined" && value.issort == "0") {
                        value.headerClass("table-sort-normal");
                    }
                    else {
                        value.headerClass("");
                    }
                }
            });
            //更新排序字段
            option.orderByField = data.fieldname;
            self.page.query(1);
        };
        event.selectClick = function (data) {
            var flag = true;
            $.each(self.selecteds(), function (key, value) {
                if (value[self.primarykeyFiled]() == data[self.primarykeyFiled]()) {
                    flag = false;
                    self.selecteds.remove(value);
                    return flag;
                }
            });
            if (flag) {
                self.selecteds.push(data);
            }
            return true;
        };
        //覆盖事件方法
        $.extend(event, option.event);
        self.event = event;
    };
    /**
    * 创建增删改查
    * @options
    *
    */
    PageConfig.Engine.CURD = function (opt) {
        if (typeof opt === "undefined" || typeof opt.config === "undefined")
            return undefined;

        var self = this;

        PageConfig.Engine.CURD.superclass.constructor.call(self, opt);
        //$.extend(self.option, opt);
        var option = self.option;
        var generateKoObject = function (config, obj) {
            obj[config.fieldname] = ko.observable(config.adddefaultvalue);
            if (typeof config.elementtype !== "undefined" && config.elementtype == "Select") {
                obj[config.optionstextfield] = ko.observable();
            }
            else if (typeof config.elementtype !== "undefined" && (config.elementtype == "Dialog"
            || config.elementtype === 'DialogGroup' || config.elementtype === 'DialogRole' || config.elementtype === 'DialogUser')) {
                obj[config.fieldname] = ko.observable();
                obj[config.optionstextfield] = ko.observable();
                if (!PageConfig.Util.isNull(config.optionsvaluefield)) {
                    eval("var fieldMap=" + config.optionsvaluefield);
                    for (var p in fieldMap) {
                        obj[fieldMap[p]] = ko.observable();
                    }
                }
            }
        };
        //数据源
        var dataSource = self.dataSource;
        dataSource.edit = {};
        dataSource.oldEdit = {};
        dataSource.add = {};
        $.each(option.config, function (key, value) {
            if (typeof value.isedit !== "undefined" && (value.isedit == 1 || value.editvisible == 1)) {
                generateKoObject(value, dataSource.edit);
                if (value.elementtype === 'Select') {
                    dataSource.select["edit" + value.fieldname] = ko.observableArray();
                    if (!PageConfig.Util.isNull(value.datasource)) {
                        eval("var conf=" + value.datasource);
                        if (!PageConfig.Util.isNull(conf.cascadeParent)) {
                            dataSource.edit["trigger" + value.fieldname] = ko.observable();
                        }
                    }
                    if (option.currentEdit == 1) {
                        dataSource.select["currentedit" + value.fieldname] = ko.observableArray();
                    }
                }
            }
            if (typeof value.isadd !== "undefined" && (value.isadd == 1 || value.addvisible === 1)) {
                generateKoObject(value, dataSource.add);
                if (value.elementtype === 'Select') {
                    dataSource.select["add" + value.fieldname] = ko.observableArray();
                    if (!PageConfig.Util.isNull(value.datasource)) {
                        eval("var conf=" + value.datasource);
                        if (!PageConfig.Util.isNull(conf.cascadeParent)) {
                            dataSource.add["trigger" + value.fieldname] = ko.observable();
                        }
                    }
                }
            }
        });
        //生成html
        if ((typeof opt.isGenerateHtml === "undefined" || opt.isGenerateHtml) && option.currentEdit == 0) {
            PageConfig.Engine.generateEditHTML(opt, self);
        }
        var event = self.event;
        /**
        * 发生请求
        * @req "add"、"delete"、"update" etc.
        */
        var sendRequest = function (req, data, fnback) {
            PageConfig.Util.escape(option.config, data);
            var sendData = escape(JSON.stringify(ko.toJS(data), "", 2));
            $.ajax({
                url: option.baseUrl + "req=" + req,
                type: "post",
                cache: false,
                data: sendData,
                success: function (result) {
                    if (result.success <= 0) {
                        Portal.Util.alert(0, result.message);
                    }
                    else {
                        fnback(result);
                    }
                }
            });
        };
        /**
        * 显示编辑对话框
        */
        var editDialog;
        event.showEdit = function () {
            if (typeof editDialog === "undefined") {
                var param = {
                    height: 415,
                    width: 950,
                    top: 30,
                    modal: true,
                    title: self.language.edit,
                    position: ['middle'],
                    resizable: true,
                    open: function (event, ui) {
                        var target = (event.currentTarget) ? event.currentTarget : event.target;
                        $(target).dialog('widget').css({ position: 'fixed', '*position': 'absolute', top: param.top + 'px', '*top': param.top + 'px' });
                    }
                };
                $.extend(param, option.dialogParam);
                editDialog = $("#editDialog").dialog(param);
            }
            else {
                editDialog.dialog();
            }
        };
        /**
        * 新增
        */
        event.add = function () {
            if (PageConfig.Util.validAndExecuteFunction(event.addBefore, dataSource.edit)) {
                if (typeof dataSource.edit.editing !== "undefined") {
                    dataSource.edit.editing(false);
                }
                else {
                    dataSource.edit.editing = ko.observable(false);
                }
                if (option.currentEdit == 1) {
                    event.save();
                }
                else {
                    event.clearEditData();
                    event.showEdit();

                }
                PageConfig.Util.validAndExecuteFunction(event.addAfter, dataSource.edit);
            }
        };
        var showEditFirstChange = [];
        event.selectCallBack = function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var options = allBindingsAccessor()["optionsExtend"];
            var valueField = allBindingsAccessor()["valueField"];
            if (PageConfig.Util.isNull(valueField)) {
                return;
            }
            var nameField = allBindingsAccessor()["nameField"];
            var flag = true;
            $.each(showEditFirstChange, function (key, value) {
                if (value === valueField) {
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                showEditFirstChange.push(valueField);
                var editData = viewModel;
                if (option.currentEdit == 0) {
                    editData = dataSource.edit;
                }
                if (typeof dataSource.oldEdit[valueField] !== "undefined") {
                    editData[valueField](dataSource.oldEdit[valueField]());
                    if (!PageConfig.Util.isNull(options.childField)) {
                        if (typeof editData["trigger" + options.childField] === "undefined") {
                            editData["trigger" + options.childField] = ko.observable();
                        }
                        editData["trigger" + options.childField]("trigger" + (new Date()).valueOf());
                    }
                }
                if (typeof dataSource.oldEdit[nameField] !== "undefined" && !PageConfig.Util.isNull(nameField)) {
                    editData[nameField](dataSource.oldEdit[nameField]());
                }
            }
        };
        /**
        * 编辑
        * @data 当前行数据
        */
        event.edit = function (data) {
            showEditFirstChange = [];
            dataSource.oldEdit = {};
            PageConfig.Util.cloneData(data, dataSource.oldEdit);
            if (PageConfig.Util.validAndExecuteFunction(event.editBefore, data)) {
                var editData = dataSource.edit;
                var obj = option.currentEdit == 1 ? data : editData;
                $.each(option.config, function (key, value) {
                    if (value.elementtype === 'Select') {
                        if (!PageConfig.Util.isNull(value.datasource)) {
                            eval("var conf=" + value.datasource);
                            if (!PageConfig.Util.isNull(conf.childField)) {
                                obj[value.fieldname](dataSource.oldEdit[value.fieldname]());
                                if (typeof obj["trigger" + conf.childField] === "undefined") {
                                    obj["trigger" + conf.childField] = ko.observable();
                                }
                                obj["trigger" + conf.childField]("trigger" + (new Date()).valueOf());
                            }
                        }
                    }
                });
                if (option.currentEdit == 1) {
                    $.each(dataSource.view(), function (key, value) {
                        if (value.editing()) {
                            value.editing(false);
                            return false;
                        }
                    });
                }
                else {
                    PageConfig.Util.cloneData(data, editData);
                    event.showEdit();
                }
                obj.editing(true);
                PageConfig.Datepicker.initDateFormat();
                PageConfig.Util.validAndExecuteFunction(event.editAfter, editData);
            }
        };
        /**
        * 新增
        */
        event.update = function (data) {
            var editData = data;
            if (PageConfig.Util.validAndExecuteFunction(event.saveBefore, editData)) {
                if (!PageConfig.Util.requireds(option.config, editData, option.language || "ch"))
                    return;
                sendRequest(option.reqs.update, editData, function (result) {
                    if (PageConfig.Util.validAndExecuteFunction(event.saveAfter, result)) {
                        self.page.query(self.page.pageIndex());
                    }
                });
            }
        }
        /**
        * 保存
        */
        event.save = function () {
            var editData = dataSource.edit;
            if (PageConfig.Util.validAndExecuteFunction(event.saveBefore, editData)) {
                if (!PageConfig.Util.requireds(option.config, editData, option.language || "ch"))
                    return;
                sendRequest(editData.editing() ? option.reqs.update : option.reqs.add, editData, function (result) {
                    if (PageConfig.Util.validAndExecuteFunction(event.saveAfter, result, editData)) {
                        self.page.query(self.page.pageIndex());
                        if (option.currentEdit == 0) {
                            editDialog.dialog("close");
                        }
                        else {
                            if (!editData.editing()) event.clearEditData();
                        }
                    }
                });
            }
        };
        event.displayMode = function (data) {
            return data.editing() == false ? option.queryid : option.editid;
        };
        /**
        * 删除
        * @data 当前行数据
        */
        event.remove = function (data) {
            if (!confirm(self.language.removeWarm))
                return;
            if (PageConfig.Util.validAndExecuteFunction(event.removeBefore, data)) {
                sendRequest(self.option.reqs.remove, data, function (result) {
                    if (PageConfig.Util.validAndExecuteFunction(event.removeAfter, result)) {
                        self.page.query(1);
                    }
                });
            }
        };
        /**
        * 启用
        * @data 当前行数据
        */
        event.enable = function (data) {
            if (PageConfig.Util.validAndExecuteFunction(event.enableBefore, data)) {
                sendRequest(self.option.reqs.enable, data, function (result) {
                    if (PageConfig.Util.validAndExecuteFunction(event.enableAfter, result)) {
                        self.page.query(self.page.pageIndex());
                    }
                });
            }
        };
        /**
        * 禁用
        * @data 当前行数据
        */
        event.disable = function (data) {
            if (PageConfig.Util.validAndExecuteFunction(event.disableBefore, data)) {
                sendRequest(self.option.reqs.disable, data, function (result) {
                    if (PageConfig.Util.validAndExecuteFunction(event.disableAfter, result)) {
                        self.page.query(self.page.pageIndex());
                    }
                });
            }
        };
        /**
        * 取消编辑
        * @data 当前行数据
        */
        event.cancel = function (data) {
            if (option.currentEdit == 1) {
                data.editing(false);
                PageConfig.Util.cloneData(dataSource.oldEdit, data);
            }
            else {
                editDialog.dialog("close");
            }
        };
        /**
        * 清空编辑区域的数据
        */
        event.clearEditData = function () {
            var editData = dataSource.edit;
            if (option.currentEdit == 1) {
                if (typeof editData.editing !== "undefined") {
                    editData.editing(false);
                }
                else {
                    editData.editing = ko.observable(false);
                }
            }
            var name = editData.editing() ? "isedit" : "isadd";

            if (PageConfig.Util.validAndExecuteFunction(event.clearBefore, editData)) {
                $.each(option.config, function (key, value) {
                    if (value[name] === 1) {
                        if (value.elementtype == "Select" || value.elementtype == "Dialog"
                        || value.elementtype == "DialogUser"
                        || value.elementtype == "DialogRole"
                        || value.elementtype == "DialogGroup") {
                            PageConfig.Util.setUndefined(editData[value.fieldname]);
                            PageConfig.Util.setUndefined(editData[value.optionstextfield]);
                        }
                        else {
                            PageConfig.Util.setUndefined(editData[value.fieldname]);
                            if (value.elementtype == "CheckBox") {
                                editData[value.fieldname](value.adddefaultvalue == 1);
                            }
                            else {
                                editData[value.fieldname](value.adddefaultvalue);
                            }
                        }
                    }
                });
                PageConfig.Util.validAndExecuteFunction(event.clearAfter, editData);
            }
        };
        //覆盖事件方法
        //$.extend(event, option.event);
    };
    //PageConfig.Engine.CURD继承PageConfig.Engine.Query
    PageConfig.Util.extend(PageConfig.Engine.CURD, PageConfig.Engine.Query);
})(PageConfig);