//PageConfig v1.0
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
    /**
    * 金额转成千分位格式
    */
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
        if (typeof newValue === "undefined" || newValue===null) {
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
    /**
    * 金额转成千分位格式
    */
    ko.bindingHandlers.amountThousandth = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            amountThousandth(element, valueAccessor, allBindingsAccessor, viewModel);
            ko.utils.registerEventHandler(element, 'change', function () {
                amountThousandth(element, valueAccessor, allBindingsAccessor, viewModel);
            });
        }
    };
})();
