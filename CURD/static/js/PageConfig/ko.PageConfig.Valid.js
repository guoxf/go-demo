//PageConfig v1.0
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
                Portal.Util.alert(2,"电话号码的格式不正确！");
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
                Portal.Util.alert(2,"邮件地址的格式不正确！");
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
}
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
}


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
}
