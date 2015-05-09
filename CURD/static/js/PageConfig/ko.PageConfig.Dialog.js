//PageConfig v1.0
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
   '<div style="margin-top: 5px"><button data-bind="click:event.ok,text:$root.language.ok"></button>' +
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
                                    options.parentVm[p](values[p].join(","));
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
        var ispage = dialogArray.isPage;
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
            isPage: ispage != undefined ? ispage : true,
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
}

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