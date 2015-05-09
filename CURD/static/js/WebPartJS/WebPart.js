(function (Portal) {
    ko.bindingHandlers.webPart = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var config = valueAccessor();
            var div = $("<div class=\"webPart\"/>");
            $(element).append(div);

            var parentList = context.$parent;
            var initVM = function () {
                var viewModel = new Portal.WebParts[config.webpartName]();
                config.vms = parentList.vms;
                viewModel.init(config, div);
                parentList.vms.push(viewModel);
            };
            //            if (typeof Portal.WebParts[config.webpartName] !== "undefined") {
            //                setTimeout(initVM, 100);
            //            } else {
            $.getScript(Portal.Util.getRootPath() + config.jsUrl, function (data, textStatus, jqxhr) {
                initVM();
            });
            //}
        }
    };

    var webPartBase = function () {
        var self = this;
        var defaults =
        {
            Msg: {
                confirmMsg: baseAllLang.PortalNew.SureCloseWidget  /* '确定关闭小窗口?'*/
            }
        };
        //默认参数
        self.option = {
            viewUrl: "",
            title: "",
            height: undefined,
            showMore: false,
            edit: false,
            draggable: false,
            toggle: true,
            showTitle: true,
            upSpacing: 0,
            downSpacing: 0,
            leftSpacing: 0,
            rightSpacing: 0,
            defineProperty: '',
            url: '',
            frame: 0
        };
        //        self.frameOption = [{ name: "弹出页", value: 1 }, { name: "本页", value: 2}];
        //创建标题
        self.createTitle = function () {
            if (self.option.showTitle)
                $(self.container).append("<div class=\"webpart-head\"><div class=\"webpart-title\" data-bind=\"click:toggle\">" +
                    "<a data-bind=\"text:commonProperties.title(),attr:{'style':$root.option.toggle==0?'text-decoration:none;cursor: default':''}\"/></div>" +
                                        "<div class=\"webpart-btn\"><i class=\"icon-common-edit\" data-bind=\"click:editProperties,visible:showEdit\"/>" +
                                        "<i class=\"icon-common-delete\" data-bind=\"click:close,visible:showEdit\"/></div></div>");
        };
        //公共属性
        self.commonProperties = {
            webpartid: ko.observable(),
            target: ko.observable(''),
            title: ko.observable(''),
            titlech: ko.observable(''),
            titleen: ko.observable(''),
            titletw: ko.observable(''),
            titlejp: ko.observable(''),
            frame: ko.observable(''),
            url: ko.observable(''),
            height: ko.observable(0),
            upSpacing: ko.observable(''),
            downSpacing: ko.observable(''),
            leftSpacing: ko.observable(''),
            rightSpacing: ko.observable(''),
            defineProperty: ko.observable(''),
            targetList: [{ Name: "弹出页", Value: "blank" }, { Name: "本页", Value: "self"}]
        };
        //自定义属性
        self.defineProperties = {};
        //容器
        self.container = undefined;
        //内容收缩
        self.showContent = ko.observable(true);
        //显示删除和编辑按钮
        self.showEdit = ko.observable();
        //内容
        self.content = $("<div class=\"webpart-content\" data-bind=\"visible:showContent\"/>  ");
        //获取数据
        self.getData = function () {
        };
        self.reload = function () { };
        //渲染页面
        self.render = function () {
            if (self.container && self.container.length > 0) {
                ko.applyBindings(self, self.container[0]);
            }
            else {
                console.log("Container is empty!");
            }
        };
        self.saveProperty = function () {
            self.commonProperties.defineProperty(ko.toJSON(self.defineProperties));
            var commonProperties = ko.toJSON(self.commonProperties);
            var param = {
                type: "updatewidget",
                commonProperties: commonProperties
            };
            $.ajax({
                type: "post",
                url: Portal.Util.getRootPath() + "Modules/Drag/DragHandler.ashx?time=" + new Date().getTime(),
                dataType: "json",
                data: param,
                async: false,
                success: function (data) {
                    if (data.resulttype === 1) {
                        self.reload();
                        self.propertyContainer.dialog("close");
                        self.commonProperties.title(self.commonProperties['title' + userInfo.language] || options['titlech']);
                        self.setContentHeight(self.commonProperties.height());
                    } else {
                        console.log(data.resultmessage);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
        };
        //初始化属性
        self.propertyContainer = $("<div class=\"webpart-property\" style=\"display:none;\"/>");
        self.propertyBody = $("<div class=\"property-body\"/>");
        self.propertyFooter = $("<div class=\"property-footer\" style=\"padding-left:150px;\"/>");
        self.propertyHeader = $("<div class=\"property-header\"/>");

        var initProperty = function () {
            self.commonProperties.title(self.option.title);
            self.commonProperties.titlech(self.option.titleCh);
            self.commonProperties.titleen(self.option.titleEn);
            self.commonProperties.titletw(self.option.titleTw);
            self.commonProperties.titlejp(self.option.titleJp);
            self.commonProperties.height(self.option.height);
            self.commonProperties.upSpacing(self.option.upSpacing);
            self.commonProperties.downSpacing(self.option.downSpacing);
            self.commonProperties.leftSpacing(self.option.leftSpacing);
            self.commonProperties.rightSpacing(self.option.rightSpacing);
            self.commonProperties.defineProperty(self.option.defineProperty);
            self.commonProperties.target(self.option.target);
            self.commonProperties.url(self.option.url);
            self.commonProperties.frame(self.option.frame);
            if (!Portal.Util.isNull(self.option.defineProperty)) {
                var defineProperties = JSON.parse(self.option.defineProperty);
                Portal.Util.copyValue(defineProperties, self.defineProperties);
            }
            if (self.container && self.showEdit()) {
                self.propertyContainer.append(self.propertyBody);
                var commonDiv = $("<div id=\"box\"/>");
                $.ajax({
                    type: "get",
                    cache: false,
                    async: false,
                    url: Portal.Util.getRootPath() + "Layout/EditProperty.htm",
                    success: function (data) {
                        commonDiv.append(data);
                    }
                });
                self.propertyBody.append(commonDiv);
                self.propertyFooter.append("<input type=\"button\" class=\"btn-blue\" data-bind=\"click:saveProperty,value:baseAllLang.PortalNew.Save\"/>");
                self.propertyContainer.append(self.propertyFooter);
                self.container.append(self.propertyContainer);
            }
        };

        var param = {
            height: 500,
            width: 600,
            modal: true,
            title: baseAllLang.PortalNew.Edit,
            position: ['middle'],
            resizable: true,
            open: function (event, ui) {
                var target = (event.currentTarget) ? event.currentTarget : event.target;
                $(target).dialog('widget').css({ position: 'fixed', '*position': 'absolute', top: '30px', '*top': '30px' });
            }
        };
        //设置属性
        self.editProperties = function (data) {
            self.propertyContainer.dialog(param);
        };
        //获取属性
        self.getProperties = function () { };
        //获取属性
        self.getProperty = function (name) { };
        //收缩
        self.toggle = function (obj) {
            if (self.option.toggle) {
                self.showContent(!self.showContent());
            }
        };
        self.loadingDiv = $("<div class=\"loading\"></div>");
        //加载中
        self.loading = function () {
            self.content.append(self.loadingDiv);
        };
        self.showMore = function () {
        };
        //加载结束
        self.loaded = function () {
            self.loadingDiv.remove();
        };
        //获取视图
        var getView = function (option) {
            if (!Portal.Util.isNull(option.viewUrl) && typeof self.content !== "undefined") {
                $.ajax({
                    type: "get",
                    cache: false,
                    url: Portal.Util.getRootPath() + option.viewUrl,
                    async: false,
                    success: function (data) {
                        self.content.append(data);
                    }
                });
            }
        };
        //设置内容高度
        self.setContentHeight = function (height) {
            if (!Portal.Util.isNull(height) && typeof self.content !== "undefined" && height != 0) {
                self.content.height(height);
            } else {
                self.content.height("auto");
            }
        };
        //创建更多按钮
        var createMoreButton = function () {
            if (self.option.showMore && typeof self.content !== "undefined") {
                self.content.attr("style", "position: relative;padding-bottom:25px;");
                self.content.append("<div class=\"webpart-content-more\" data-bind=\"visible:option.showMore,click:showMore,attr:{title:baseAllLang.Portal.More}\"><i class=\"icon-common-more\"></i></div>");
            }
            else {
                self.content.attr("style", "position: relative;padding-bottom:0px;");
            }
        };
        self.stopBubble = function (vm, e) {
            //如果提供了事件对象，则这是一个非IE浏览器
            if (e && e.stopPropagation)
            //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
            else
            //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
        }; ;
        //创建遮罩层
        self.createOverLay = function () {
            if (self.showEdit()) {
                self.content.append("<div class=\"webpart-content-overlay\"/>");
            }
        };
        //初始化
        self.init = function (option, container) {
            //开启加载中
            self.loading();
            if (option.webpartname != "Login") {
                Portal.Util.validSession(function () { }, function () {
                    if (typeof homeVM !== "undefined" && typeof homeVM.destroy !== "function") {
                        homeVM.destroy();
                    }
                    new Portal.WebParts.Login().init({ viewUrl: "Modules/Login/Login.htm", showTitle: false, webpartname: 'Login' }, document.getElementById("loginDiv"));
                });
            }
            //
            $.extend(self.option, option);

            self.showEdit(self.option.edit);
            self.container = $(container);

            //初始化属性
            initProperty();
            //创建标题
            self.createTitle();
            //创建更多按钮
            createMoreButton();
            //设置内容高度
            self.setContentHeight(self.commonProperties.height());

            self.container.append(self.content);
            //获取视图
            getView(self.option);

            //获取业务数据
            self.getData();
            //渲染页面
            ko.cleanNode(self.container[0]);

            self.render();
            //关闭加载中
            self.loaded();

            self.commonProperties.webpartid(self.option.webpartId);
            self.createOverLay();
        };
        //删除webpart
        self.close = function () {
            if (confirm(defaults.Msg.confirmMsg)) {
                if (typeof homeVM !== "undefined" && homeVM.option.isEdit) {
                    homeVM.removeItem(self, self.container);
                }
                self.destroy();
            }
        };
        //销毁
        self.destroy = function () {
            ko.utils.domNodeDisposal.removeNode(self.container[0]);
        };
    };
    Portal.WebParts = Portal.WebParts || {};
    Portal.WebParts.webPartBase = webPartBase;

    Portal.WebParts.SetAppHeight = function (obj) {
        var mainheight = $(obj).contents().find('body').height() + 30;
        $(obj).height(mainheight);
    };


    //交互方式
    Portal.Intent = {
        //替换中间
        normal: function (webpartConfig) {
            if (typeof homeVM === "undefined") {
                console.log("homeVM is undefined!");
                return;
            }
            homeVM.contentCols.removeAll();
            homeVM.navCols.removeAll();
            var layout = { "id": "layout21", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 100%;", "cssClass": "span10" };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(webpartConfig));
            cols.push(new Portal.Layout.column(layout, webParts));
            homeVM.navCols(cols);
            $("#divNav").parent().css('width', '100%');
            $("#divNav").parent().css({ 'background-color': 'rgb(245,245,245)', 'border-right': '1px solid #e1e0ef' });
            $("#divNav").css('width', '100%');
            $("#layout21").css('height', Portal.Util.getContentHeight());

        },
        //替换中间左边部分
        changeNav: function (webpartConfig) {
            if (typeof homeVM === "undefined")
                return;
            homeVM.contentCols.removeAll();
            homeVM.navCols.removeAll();
            var layout = { "id": "layout21", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 200px;", "cssClass": "span10" };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(webpartConfig));
            cols.push(new Portal.Layout.column(layout, webParts));
            homeVM.navCols(cols);
            $("#layout21").css('height', Portal.Util.getContentHeight());
            $("#divNav").parent().css('width', '200px');
            $("#divNav").parent().css({ 'background-color': 'rgb(245,245,245)', 'border-right': '1px solid #e1e0ef' });
            $("#divNav").css('width', '200px');
            $("#layout22").find(".webPart").attr("style", "border:0px;margin-right:0px;");
        },
        changeContent: function (webpartConfig) {
            if (typeof homeVM === "undefined")
                return;
            homeVM.contentCols.removeAll();
            var layout = { "id": "layout22", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 98%;padding-left: 10px;", "cssClass": "span10"
            };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(webpartConfig));
            cols.push(new Portal.Layout.column(layout, webParts));
            homeVM.contentCols(cols);
            $("#layout22").find(".webPart").attr("style", "border:0px;margin-right:0px;");
            $("#layout21").css('min-height', Portal.Util.getContentHeight());
        },
        //通用的webpart，以iframe加载
        commonWebpart: function (webpartConfig) {
            if (typeof homeVM === "undefined")
                return;
            var commonWebpartConfig = { webpartname: "Apps", showtitle: false };
            $.extend(true, commonWebpartConfig, webpartConfig);
            commonWebpartConfig.jsurl = "Modules/Home/ViewModel/Apps.js";
            homeVM.contentCols.removeAll();
            homeVM.navCols.removeAll();
            var layout = { "id": "layout22", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 100%;", "cssClass": "span10" };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(commonWebpartConfig));
            cols.push(new Portal.Layout.column(layout, webParts));
            homeVM.contentCols(cols);
            $("#layout21").css('height', Portal.Util.getContentHeight());
        },
        changeContentByCommon: function (webpartConfig) {
            if (typeof homeVM === "undefined")
                return;
            homeVM.contentCols.removeAll();
            homeVM.navCols.removeAll();
            var commonWebpartConfig = { webpartname: "Apps", showtitle: false };
            $.extend(true, commonWebpartConfig, webpartConfig);
            commonWebpartConfig.jsurl = "Modules/Home/ViewModel/Apps.js";
            homeVM.contentCols.removeAll();
            var layout = { "id": "layout22", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 98%;padding-left: 1%;", "cssClass": "span10"
            };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(commonWebpartConfig));
            cols.push(new Portal.Layout.column(layout, webParts));
            homeVM.contentCols(cols);
            eval("var layout =" + homeVM.homeLayout.layout.layoutposition);
            homeVM.navCols(Portal.Layout.createRow(layout.navCols, homeVM.homeLayout.webPartConfig));
            $("#layout22").find(".webPart").attr("style", "border:0px;margin-right:0px;");
            $("#layout21").css('height', Portal.Util.getContentHeight());
            $("#divNav").parent().css('width', '200px');
            $("#divNav").css('width', '200px');
            if (window.homeTopVM && typeof window.homeTopVM.changeNavActive === "function") {
                window.homeTopVM.changeNavActive({ modulename: "首页" });
            }
        },
        //中间左边部门加载首页默认，替换中间右边部分
        defaultNav: function (webpartConfig) {
            if (typeof homeVM === "undefined")
                return;
            homeVM.contentCols.removeAll();
            homeVM.navCols.removeAll();
            var contentLayout = { "id": "layout22", "options": { "disabled": false, "cancel": ".disableDrag" }, "style": "width: 98%;padding-left: 1%;", "cssClass":
"span10"
            };
            var cols = [];
            var webParts = [];
            webParts.push(new Portal.Layout.webPart(webpartConfig));
            cols.push(new Portal.Layout.column(contentLayout, webParts));
            homeVM.contentCols(cols);
            eval("var layout =" + homeVM.homeLayout.layout.layoutposition);
            homeVM.navCols(Portal.Layout.createRow(layout.navCols, homeVM.homeLayout.webPartConfig));
            $("#layout22").find(".webPart").attr("style", "border:0px;margin-right:0px;");
            $("#layout21").css('height', Portal.Util.getContentHeight());
            $("#divNav").parent().css('width', '200px');
            $("#divNav").parent().css('background-color', 'rgb(245,245,245)');
            $("#divNav").css('width', '200px');
            if (window.homeTopVM && typeof window.homeTopVM.changeNavActive === "function") {
                window.homeTopVM.changeNavActive({ modulename: "首页" });
            }
        },
        //加载首页中间部分
        home: function () {
            eval("var layout =" + homeVM.homeLayout.layout.layoutposition);
            homeVM.contentCols(Portal.Layout.createRow(layout.contentCols, homeVM.homeLayout.webPartConfig));
            homeVM.navCols(Portal.Layout.createRow(layout.navCols, homeVM.homeLayout.webPartConfig));
            $("#divNav").parent().css('width', '200px');
            $("#divNav").css('width', '200px');
            $("#layout21").css('min-height', Portal.Util.getContentHeight());
            $("#divNav").parent().css({ 'background-color': 'rgb(245,245,245)', 'border-right': '1px solid #e1e0ef' });
        },
        BPM: function (data) {
            var BPMConfig = {
                draggable: false, height: 0, jsurl: "Modules/Home/ViewModel/HomeBPM.js",
                viewurl: "Modules/Home/View/BPM.htm", layout: "22",
                webpartname: "HomeBPM", title: "", toggle: false, showtitle: false
            };
            BPMConfig.data = data;
            Portal.Intent.normal(BPMConfig);
            if (window.homeTopVM && typeof window.homeTopVM.changeNavActive === "function") {
                window.homeTopVM.changeNavActive({ modulename: "BPM" });
            }
        },
        News: function (data) {
            var newsConfig = {
                draggable: false, height: 0, jsurl: "Modules/News/ViewModel/News.js",
                viewurl: "Modules/News/View/News.htm", layout: "22",
                webpartname: "News", title: "", toggle: false, showtitle: false
            };
            Portal.Intent.normal(newsConfig);
            $("#layout21").css('height', "auto");
            $("#layout21").css('min-height', Portal.Util.getContentHeight());
            $("#divNav").parent().css({ 'background-color': '#fff', 'border-right': 'none' });

            //$("#divNav").parent().css('width', '100%');
            //$("#divNav").parent().css({ 'background-color': 'rgb(245,245,245)', 'border-right': '1px solid #e1e0ef' });
            //$("#divNav").css('width', '100%');
            //$("#layout21").css('height', Portal.Util.getContentHeight());
        },
        Notice: function (data) {
            var noticeConfig = {
                draggable: false, height: 0, jsurl: "Modules/Notice/ViewModel/Notice.js",
                viewurl: "Modules/Notice/View/Notice.htm", layout: "22",
                webpartname: "Notice", title: "", toggle: false, showtitle: false
            };
            Portal.Intent.normal(noticeConfig);
            $("#layout21").css('height', "auto");
            $("#layout21").css('min-height', Portal.Util.getContentHeight());
            $("#divNav").parent().css({ 'background-color': '#fff', 'border-right': 'none' });
        }
    };
})(Portal);
