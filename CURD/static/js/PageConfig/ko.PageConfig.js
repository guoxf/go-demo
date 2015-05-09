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
        generateHtml(options.config, container, options.language || "ch", options.isCURD,options);
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
                exportPDF: "导出PDF",
                toPublic:"发布",
                toTop:"置顶",
                cancelPublic:"取消发布",
                cancelTop:"取消置顶"
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
                exportPDF: "Export PDF",
                toPublic:"Public",
                toTop:"Top",
                cancelPublic:"Cancel Public",
                cancelTop:"Cancel Top"
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
                exportPDF: "導出 PDF",
                toPublic:"发布",
                toTop:"置顶",
                cancelPublic:"取消发布",
                cancelTop:"取消置顶"
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
                exportPDF: "輸出 PDF",
                toPublic:"发布",
                toTop:"置顶",
                cancelPublic:"取消发布",
                cancelTop:"取消置顶"
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
        self.firstEnable=ko.observable(true);
        self.prevEnable=ko.observable(true);
        self.nextEnable=ko.observable(true);
        self.lastEnable=ko.observable(true);
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
                            pageIndex=self.pageIndex();
                            if(pageIndex<=1){
                                self.firstEnable(false);
                                self.prevEnable(false);
                            }
                            else{
                                self.firstEnable(true);
                                self.prevEnable(true);
                            }
                            if(pageIndex<self.totalPages()){
                             self.nextEnable(true);
                            self.lastEnable(true);
                            }
                            else{
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
        self.selecteds=ko.observableArray();;
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
                obj.display=value["display"+option.language];
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
                    else if(value.elementtype=="DateRange"){
                        PageConfig.Util.setUndefined(conditionData[value.fieldname]);
                        PageConfig.Util.setUndefined(conditionData[value.fieldname+"1"]);
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
            var flag=true;
             $.each(self.selecteds(),function(key,value){
                if(value[self.primarykeyFiled]()==data[self.primarykeyFiled]()){
                    flag=false;
                    self.selecteds.remove(value);
                    return flag;
                }
             });
             if(flag){
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
                        Portal.Util.alert(0,result.message);
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
                    top:30,
                    modal: true,
                    title: self.language.edit,
                    position: ['middle'],
                    resizable: true,
                    open: function (event, ui) {
                        var target = (event.currentTarget) ? event.currentTarget : event.target;
                        $(target).dialog('widget').css({ position: 'fixed', '*position': 'absolute', top: param.top+'px', '*top': param.top+'px' });
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
                    if (PageConfig.Util.validAndExecuteFunction(event.saveAfter, result,editData)) {
                        self.page.query(self.page.pageIndex());
                        if (option.currentEdit == 0) {
                            editDialog.dialog("close");
                        }
                        else{
                            if(!editData.editing()) event.clearEditData();
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
                            if(value.elementtype=="CheckBox"){
                                editData[value.fieldname](value.adddefaultvalue==1);
                            }
                            else{
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

