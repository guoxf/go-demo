//PageConfig v1.0
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