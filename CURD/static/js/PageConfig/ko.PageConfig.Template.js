//PageConfig v1.0
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
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\" style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
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
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\" style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
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
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\"  style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
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
                var template = "<td style='width:{1};'><div class=\"input-append\" data-bind=\"{2}\"  style=\"width:100%;text-align:{3}\"><input class=\"span2\" style=\"width:100px;\" data-bind=\"value:{0}\" type=\"text\" readonly=\"readonly\"/>" +
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
                return "<th data-bind=\"text:$root.language.action\" style=\"width:140px;text-align:center;\"></th>";
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
                //                if (n > 0) {
                //                    for (; n < count; n++) {
                //                        tds.push("<td class='condition-header'/><td/>");
                //                    }
                //                }
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
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.firstEnable,click:page.firstPage,text:$root.language.firstpage\">首页</button><span style='margin:0 4px;'></span>" +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.prevEnable,click:page.prevPage,text:$root.language.prevpage\">上页</button><span style='margin:0 4px;'></span>" +
                                                 "<button type='button' class='btn btn-link' data-bind=\"enable:page.nextEnable,click:page.nextPage,text:$root.language.nextpage\">下页</button><span style='margin:0 4px;'></span>" +
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