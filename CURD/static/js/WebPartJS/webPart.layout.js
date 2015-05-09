(function (Portal) {
    Portal = Portal || {};
    Portal.Layout = Portal.Layout || {};

    var webPart = function (options) {
        var self = this;
        self.webpartId = options.webpartid;
        self.webpartInfoId = options.webpartinfoid;
        self.layoutId = options.layoutid;
        self.positionNo = options.positionno;
        self.positionId = options.positionid;
        self.target = options.target;
        self.title = options['title' + userInfo.language] || options['titlech'];
        self.titleCh = options.titlech; 
        self.titleEn = options.titleen; 
        self.titleTw = options.titletw;
        self.titleJp = options.titlejp;
        self.url = options.url;
        self.frame = options.frame;
        self.height = options.height;
        self.upSpacing = options.upspacing;
        self.downSpacing = options.downspacing;
        self.leftSpacing = options.leftspacing;
        self.rightSpacing = options.rightspacing;
        self.defineProperty = options.defineproperty;

        self.jsUrl = options.jsurl;
        self.viewUrl = options.viewurl;
        self.webpartName = options.webpartname;
        self.toggle = options.toggle;
        self.showMore = options.showmore;
        self.layout = options.layout;
        self.showTitle = options.showtitle;
        self.edit = options.edit;
        self.draggable = options.draggable;

        self.data = options.data;
    };

    var column = function (options, webParts) {
        var self = this;
        self.id = options.id;
        self.options = options.options;
        self.style = options.style;
        self.cssClass = options.cssClass;
        self.webpartIds = options.webpartIds;
        self.webparts = ko.observableArray(webParts);
        self.vms = [];
        self.removeWebPart = function (key) {
            var vm = self.vms.splice(key, 1);
            vm.destroy();
        };
        self.removeAllWebPart = function () {
            self.vms = [];
        };
    };
    Portal.Layout.webPart = webPart;
    Portal.Layout.column = column;
    //生成布局信息
    var generatePosition = function (rows) {
        if (typeof rows === "undefined" || rows === null) {
            console.log("error:rows is undefined!");
            return null;
        }
        var positions = [];
        var ids = [];
        $.each(rows, function (key0, value0) {
            var col = {};
            col.id = value0.id;
            col.options = value0.options;
            col.style = value0.style;
            col.cssClass = value0.cssClass;
            var webpartIds = [];
            $.each(value0.webparts(), function (key1, value1) {
                webpartIds.push(value1.webpartId);
                ids.push(value1.webpartId);
            });
            col.webpartIds = webpartIds;
            positions.push(col);
        });
        return { positions: positions, webpartIds: ids };
    };

    Portal.Layout.generatePosition = generatePosition;
    //创建行列对象
    var createRow = function (layout, webpartConfig, isEdit) {
        var row = [];
        $.each(layout, function (key0, value0) {
            var webparts = [];
            $.each(webpartConfig, function (key2, value2) {
                if (value0.id == value2.positionid) {
                    if (!isEdit) {
                        value2.edit = false;
                    } else {
                        value2.edit = true;
                    }
                    webparts.push(new webPart(value2));
                }
            });
            row.push(new column(value0, webparts));
        });
        return row;
    };
    Portal.Layout.createRow = createRow;
    //
    var HomeLayout = function () {
        var self = this;
        //使继承生效
        HomeLayout.superclass.constructor.call(self);
        //用户个人信息
        self.userInfo;
        //全部多语言信息
        self.baseAllLang;

        self.rows = ko.observableArray([]);
        //顶部
        self.topCols = ko.observableArray([]);
        //左侧
        self.navCols = ko.observableArray([]);
        //底部
        self.bottomCols = ko.observableArray([]);
        //右侧
        self.contentCols = ko.observableArray([]);
        //生成布局信息
        self.generatePosition = function () {
            var positions = {};
            var topCols = generatePosition(self.topCols());
            positions.topCols = topCols.positions;
            var navCols = generatePosition(self.navCols());
            positions.navCols = navCols.positions;
            var bottomCols = generatePosition(self.bottomCols());
            positions.bottomCols = bottomCols.positions;
            var contentCols = generatePosition(self.contentCols());
            positions.contentCols = contentCols.positions;
            var webPartIds = [];
            webPartIds.push(topCols.webpartIds);
            webPartIds.push(navCols.webpartIds);
            webPartIds.push(bottomCols.webpartIds);
            webPartIds.push(contentCols.webpartIds);
            var layout = {
                layoutId: self.homeLayout.layout.layoutid,
                moduleId: self.homeLayout.layout.moduleid,
                positions: JSON.stringify(positions),
                webpartIds: webPartIds.join(',')
            };
            return layout;
        };
        
        //新增widget
        var onAdd = function (arg) {
            var param = {
                type: "add",
                titleCh: arg.item.titleCh,
                titleEn: arg.item.titleEn,
                titleTw: arg.item.titleTw,
                titleJp: arg.item.titleJp,
                webPartInfoId: arg.item.webpartInfoId,
                layoutId:self.homeLayout.layout.layoutid
            };
            $.ajax({
                type: "post",
                url: Portal.Util.getRootPath() + "Modules/Drag/DragHandler.ashx?" + new Date().getTime(),
                dataType: "json",
                data: param,
                async: false,
                success: function (data) {
                    if (data.resulttype === 1) {
                        var item = {};
                        $.extend(item, arg.item);
                        item.webpartId = data.resultidentityid;
                        item.edit=true;
                        arg.targetParent.splice(arg.targetIndex, 0, item);
                    } else {
                        console.log(data.resultmessage);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
        };

        //移动widget
        var onChangePositions = function (layout) {
            var param = {
                type: "change",
                positions: layout,
                layoutId: layout.layoutId
            };
            $.ajax({
                type: "post",
                url: Portal.Util.getRootPath() + "Modules/Drag/DragHandler.ashx?" + new Date().getTime(),
                dataType: "json",
                data: param,
                success: function (data) {
                    if (data.resulttype === 1) {
                    } else {
                        console.log(data.resultmessage);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
        };

        //关闭widget 
        var onClose = function (sortItem) {
            var param = {
                type: "close",
                widgetId: sortItem.webpartId
            };
            $.ajax({
                type: "post",
                url: Portal.Util.getRootPath() + "Modules/Drag/DragHandler.ashx?" + new Date().getTime(),
                dataType: "json",
                data: param,
                success: function (data) {
                    if (data.resulttype === 1) {
                    } else {
                        console.log(data.resultmessage);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });

        };
        //新增或者移动
        self.afterMove = function (arg, event, ui) {
            var parents = arg.targetParent();
            var positionid = arg.positionId;
            var items = [];
            for (var i = 0; i < parents.length; i++) {
                var item = {};
                item.positionno = i + 1;
                item.webpartid = parents[i].webpartId;
                item.positionid = positionid;
                items.push(item);
            }
            onChangePositions(JSON.stringify(items));
        };
        self.addBefore = function (arg, event, ui) {
            if (!arg.item.webpartId) {
                //arg.item.titleCh = arg.item.title;
                arg.notAdd = false;
                onAdd(arg);
            }
        };
        //删除
        self.removeItem = function (item, container) {
            var sortItem = ko.utils.domData.get(container.parent()[0], "ko_sortItem");
            onClose(sortItem);
        };

        //
        self.webParts = ko.observableArray();
        //获取数据
        self.getData = function () {
            var homeLayout = self.option.homeLayout;
            self.homeLayout = homeLayout;
            var webPartConfig = homeLayout.webPartConfig;
            $.each(homeLayout.elements, function (key, value) {
                self.webParts.push(new webPart(value));
            });
            eval("var layout =" + homeLayout.layout.layoutposition);

            self.topCols(createRow(layout.topCols, webPartConfig, self.option.isEdit));
            self.navCols(createRow(layout.navCols, webPartConfig, self.option.isEdit));
            self.bottomCols(createRow(layout.bottomCols, webPartConfig, self.option.isEdit));
            self.contentCols(createRow(layout.contentCols, webPartConfig, self.option.isEdit));
        };
        //渲染页面
        self.render = function () {
            if (self.container && self.container.length > 0) {
                ko.applyBindings(self, self.container[0]);
            }
            else {
                console.log("Container is empty!");
            }
        };

    };
    //继承基类
    Portal.Util.extend(HomeLayout, Portal.WebParts.webPartBase);
    //加入WebPart
    Portal.WebParts.HomeLayout = HomeLayout;
})(Portal);