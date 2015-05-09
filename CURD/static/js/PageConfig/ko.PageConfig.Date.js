//PageConfig v1.0
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