(function(window, angular) {
    "use strict";
    angular.module('elvinTable.localization', [])
        .filter("i18n", ['localizedTexts', '$rootScope',
            function(localizedTexts, $rootScope) {
                return function(text, language) {
                    var currentLanguage = language || $rootScope.language || 'en';
                    if (localizedTexts[currentLanguage][text]) {
                        return localizedTexts[currentLanguage][text];
                    }
                    return text;
                }
            }
        ])
        .value('localizedTexts', {
            "Ch": {
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
            "En": {
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
            "Tw": {
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
            "Jp": {
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
        });
    angular.module('elvinTable.directives', ['elvinTable.templateUrlList', 'elvinTable.templates', 'elvinTable.localization', 'elvinTable.util'])
        .directive('elvinTable', ['templateUrlList',
            function(templateUrlList) {
                return {
                    restrict: 'EA',
                    scope: {
                        config: '='
                    },
                    //replace: true,
                    templateUrl: templateUrlList.elvinTable,
                    controller: 'TableCtrl',
                    link: function(scope, iElement, iAttrs, ctrl) {
                        ctrl.config = scope.config;
                    }
                };
            }
        ])
        .directive('elvinTablePage', ['templateUrlList',
            function(templateUrlList) {
                return {
                    restrict: 'EA',
                    templateUrl: templateUrlList.elvinTablePage,
                    link: function(scope, iElement, iAttrs, ctrl) {}
                };
            }
        ])
        .directive('elvinTableEdit', ['generateHtml', '$compile',
            function(generateHtml, $compile) {
                return {
                    restrict: 'EA',
                    scope: {
                        curdConfig: '=',
                        config: '=',
                        data: '='
                    },
                    link: function(scope, iElement, iAttrs, ctrl) {
                        scope.$watch('curdConfig', function(curdConfig) {
                            if (curdConfig && !scope.editContainer) {
                                scope.editContainer = iElement;
                                var createEdit = generateHtml.createEdit;
                                iElement.append(createEdit(curdConfig.sysCurd, curdConfig.sysCurdField, scope.config));
                                $compile(iElement.contents())(scope);
                            };
                        });

                    }
                };
            }
        ])
        .directive('elvinTableCondition', ['generateHtml', '$compile',
            function(generateHtml, $compile) {
                return {
                    restrict: 'EA',
                    scope: {
                        curdConfig: '=',
                        config: '=',
                        data: '='
                    },
                    link: function(scope, iElement, iAttrs, ctrl) {
                        scope.$watch('curdConfig', function(curdConfig) {
                            if (curdConfig && !scope.editContainer) {
                                scope.editContainer = iElement;
                                var createCondition = generateHtml.createCondition;
                                iElement.append(createCondition(curdConfig.sysCurd, curdConfig.sysCurdField, scope.config));
                                $compile(iElement.contents())(scope);
                            };
                        });

                    }
                };
            }
        ])
        .directive('elvinTableAdd', ['generateHtml', '$compile',
            function(generateHtml, $compile) {
                return {
                    restrict: 'EA',
                    scope: {
                        curdConfig: '=',
                        config: '=',
                        data: '='
                    },
                    link: function(scope, iElement, iAttrs, ctrl) {
                        scope.$watch('curdConfig', function(curdConfig) {
                            if (curdConfig && !scope.addContainer) {
                                scope.addContainer = iElement;
                                var createAdd = generateHtml.createAdd;
                                iElement.append(createAdd(curdConfig.sysCurd, curdConfig.sysCurdField, scope.config));
                                $compile(iElement.contents())(scope);
                            };
                        });

                    }
                };
            }
        ])
        .directive('elvinTableConditionButton', ['generateHtml', '$compile',

            function(generateHtml, $compile) {
                return {
                    restrict: 'EA',
                    link: function(scope, iElement, iAttrs) {
                        if (scope.config.showQuery) {
                            iElement.append(generateHtml.createQueryButton());
                        }
                        if (scope.config.showClear) {
                            iElement.append(generateHtml.createClearButton());
                        }
                        if (scope.config.showAdd) {
                            iElement.append(generateHtml.createAddButton());
                        }
                        $compile(iElement.contents())(scope);
                    }
                };
            }
        ])
        .directive('elvinTableViewButton', ['generateHtml', '$compile',

            function(generateHtml, $compile) {
                return {
                    restrict: 'EA',
                    link: function(scope, iElement, iAttrs) {
                        if (scope.config.showEdit) {
                            iElement.append(generateHtml.createEditButton());
                        }
                        if (scope.config.showDelete) {
                            iElement.append(generateHtml.createDeleteButton());
                        }
                        if (scope.config.showActive) {
                            iElement.append(generateHtml.createActiveButton());
                        }
                        $compile(iElement.contents())(scope);
                    }
                };
            }
        ])
        .directive('elvinTableSaveButton', [

            function() {
                return {
                    restrict: 'EA',
                    template: "<button type='button' class='btn' ng-click='save(data)'>{{'save' | i18n:config.language}}</button>",
                    link: function(scope, iElement, iAttrs) {

                    }
                };
            }
        ])
        .directive('elvinTableCancelButton', [

            function() {
                return {
                    restrict: 'EA',
                    template: "<button type='button' class='btn' ng-click='cancel()'>{{'cancel' | i18n:config.language}}</button>",
                    link: function(scope, iElement, iAttrs) {

                    }
                };
            }
        ])
        .directive('elvinTableHeaderCell', [

            function() {
                return {
                    restrict: 'C',
                    require: '^elvinTable',
                    link: function(scope, iElement, iAttrs, ctrl) {
                        if (scope.field.IsSort == 1) {
                            iElement.bind("click", function(event) {
                                ctrl.sortBy(scope.field);
                            });
                        };
                    }
                };
            }
        ])
        .directive('elvinTableDataCell', [

            function() {
                return {
                    restrict: 'C',
                    link: function(scope, iElement, iAttrs) {
                        debugger
                        iElement.text(scope.formatedValue);
                    }
                };
            }
        ]);

    angular.module('elvinTable.templates', ['elvinTable/template/ElvinTable.html', 'elvinTable/template/DiggPage.html']);
    /**
     * elvinTable.template Module
     *
     * Description
     */
    angular.module('elvinTable/template/ElvinTable.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/ElvinTable.html',
                '<div ng-controller="TableCtrl">' +
                '<elvin-table-condition curd-config="curdConfig" config="config" data="conditionData"></elvin-table-condition>' +
                '<elvin-table-condition-button config="config"></elvin-table-condition-button>' +
                '<table class="table">' +
                '<thead><tr><th colspan="{{header.length+1}}"><elvin-table-page></elvin-table-page></th></tr>' +
                '<tr><th class="elvin-table-header-cell" ng-repeat="field in header">{{field.DisplayCh}}</th><th>Action</th></tr></thead>' +
                '<tbody><tr ng-repeat="field in sysCurdField ">' +
                '<td ng-repeat="column in header" >{{field[column.FieldName]}}</td>' +
                '<td><elvin-table-view-button></elvin-table-view-button></td>' +
                '</tr></tbody></table>');
        }
    ]);
    angular.module('elvinTable/template/DiggPage.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/DiggPage.html', '<div class=\"row-fluid\">' +
                '<div style="float: left;color: Black">' +
                '<span style=\"float: left;\">{{\'pagemsg1\' | i18n:config.language}}</span> ' +
                '<span style="float: left;color:#1cbbe5;margin:0 2px;">{{recordCount}}</span> ' +
                '<span style="float: left;">{{\'pagemsg2\' | i18n:config.language}}</span> ' +
                '<span style=\"float: left;color:#1cbbe5;margin:0 2px;\" ng-bind="pageIndex\">' +
                '</span> ' +
                '<span style=\"float: left; \">' +
                '/</span> ' +
                '<span style="float: left;color:#1cbbe5;margin:0 2px;\" ng-bind=\"totalPages\">' +
                '</span> ' +
                '</div>' +
                '<div style="margin-right:10px;float: right;color: Black">' +
                "<a ng-click=\"firstPage()\">{{\'firstpage\' | i18n:config.language}}</a><span style='margin:0 4px;'>|</span>" +
                "<a ng-click=\"prevPage()\">{{\'prevpage\' | i18n:config.language}}</a><span style='margin:0 4px;'>|</span>" +
                "<a ng-click=\"nextPage()\">{{\'nextpage\' | i18n:config.language}}</a><span style='margin:0 4px;'>|</span>" +
                "<a ng-click=\"lastPage()\">{{\'lastpage\' | i18n:config.language}}</a>" +
                "</div>" +
                "</div>");
        }
    ]);
    (function(angular) {
        "use strict";
        angular.module('elvinTable.templateUrlList', [])
            .constant('templateUrlList', {
                elvinTable: 'elvinTable/template/ElvinTable.html',
                elvinTablePage: 'elvinTable/template/DiggPage.html'
            });
    })(angular);
    /**
     * elvinTable.table Module
     *
     * Description
     */
    angular.module('elvinTable.table', ['elvinTable.directives', 'elvinTable.localization', 'ui.bootstrap'])
        .constant('DefaultTableConfiguration', {
            selectionMode: 'single',
            showAdd: true,
            showQuery: true,
            showClear: true,
            showEdit: true,
            showDelete: true,
            showActive: true,
            displaySelectionCheckbox: false,
            itemsByPage: 10,
            name: 'CURDField',
            baseUrl: '/CURD/',
            language: 'Ch'
        })
        .controller('EditCtrl', ['$scope',
            function($scope) {

            }
        ])
        .controller('TableCtrl', ['$scope', '$http', 'DefaultTableConfiguration', '$modal',
            function($scope, $http, defaultConfig, $modal) {
                $scope.header = [];
                $scope.sysCurd = {};
                $scope.sysCurdField = [];
                $scope.recordCount = 100;
                $scope.pageIndex = 1;
                $scope.totalPages = 10;
                $scope.curdConfig;
                $scope.editData = {};
                $scope.addData = {};
                $scope.addOrEdit = true;
                var logError = function(data, status) {
                    console.log('code' + status + ': ' + data);
                };
                $scope.firstPage = function() {
                    $scope.pageIndex = 1;
                };
                $scope.prevPage = function() {
                    $scope.pageIndex = $scope.pageIndex - 1;
                };
                $scope.nextPage = function() {
                    $scope.pageIndex = $scope.pageIndex + 1;
                };
                $scope.lastPage = function() {
                    $scope.pageIndex = totalPages;
                };
                this.sortBy = function(columnConfig) {
                    if (columnConfig.isAsc) {
                        columnConfig.isAsc = false;
                    } else {
                        columnConfig.isAsc = true;
                    }
                    alert(columnConfig.isAsc);
                    alert(columnConfig.FieldName);
                };
                $scope.query = function() {

                };
                $scope.add = function() {
                    $scope.addModalInstance = $modal.open({
                        template: '<elvin-table-add curd-config="curdConfig" config="config" data="addData"></elvin-table-add>' +
                            '<div style="margin:20px;"><elvin-table-save-button></elvin-table-save-button><elvin-table-cancel-button></elvin-table-cancel-button></div>',
                        scope: $scope,
                        backdrop: 'static',
                        elWidth: '1100px'
                    });
                    $scope.addOrEdit = true;
                };
                $scope.edit = function(data) {
                    angular.extend($scope.editData, data);
                    $scope.editModalInstance = $modal.open({
                        template: '<elvin-table-edit curd-config="curdConfig" config="config" data="editData"></elvin-table-edit>' +
                            '<div style="margin:20px;"><elvin-table-save-button></elvin-table-save-button><elvin-table-cancel-button></elvin-table-cancel-button></div>',
                        scope: $scope,
                        backdrop: 'static',
                        elWidth: '1100px'
                    });
                    $scope.addOrEdit = false;
                };
                $scope.update = function() {

                };
                $scope.active = function(data) {
                    data.Active = data.Active == 1 ? 0 : 1;
                    $http.post($scope.config.baseUrl + "Active", {
                        params: {
                            data: data
                        }
                    }).success(function(data) {})
                        .error(logError);
                };
                $scope.delete = function(data) {
                    alert(data.FieldName);
                    $http.post($scope.config.baseUrl + "Delete", {
                        data: data
                    }).success(function(data) {

                    })
                        .error(logError);
                };
                $scope.cancel = function() {
                    $scope.editModalInstance && $scope.editModalInstance.close();
                    $scope.addModalInstance && $scope.addModalInstance.close();
                };
                $scope.clearData = function(data, type) {};
                $scope.save = function() {
                    var sendData = $scope.addOrEdit ? $scope.addData : $scope.editData;
                    $scope.cancel();
                };
                var getCurdConfig = function() {
                    return $http.get($scope.config.baseUrl + "getConfig", {
                        params: {
                            name: $scope.config.name
                        }
                    }).success(function(data) {
                        $scope.sysCurd = data.SysCurd;
                        $scope.sysCurdField = data.SysCurdField;
                        $scope.curdConfig = {
                            sysCurd: data.SysCurd,
                            sysCurdField: data.SysCurdField
                        };
                        if ($scope.sysCurdField && $scope.sysCurdField.length > 0) {
                            $scope.recordCount = $scope.sysCurdField.length;
                            $scope.totalPages = $scope.recordCount / 10 + 1;
                            angular.forEach($scope.sysCurdField, function(value, key) {
                                if (value.IsShow == 1) {
                                    $scope.header.push(value);
                                }
                            });
                        }
                    })
                        .error(logError);
                };
                $scope.config = angular.extend(defaultConfig, $scope.config);
                getCurdConfig();

            }
        ]);

    /**
     * elvinTable.util Module
     *
     * Description
     */
    angular.module('elvinTable.util', [])
        .factory('generateHtml', [

            function() {
                var generateByElement = {};
                generateByElement.TextBox = function(config, language) {
                    return '<td><input type="text" ng-model="data.' + config.FieldName + '"></td>';
                };
                generateByElement.Label = function(config, language) {
                    return '<td>{{data.' + config.FieldName + '}}</td>';
                };
                generateByElement.Date = function(config, language) {};
                generateByElement.Select = function(config, language) {};
                generateByElement.A = function(config, language) {};
                generateByElement.TextArea = function(config, language) {};
                generateByElement.Dialog = function(config, language) {};
                generateByElement._labelRequired = function(config, language) {
                    return "<td>{{'" + config["Display" + language] + "'}}</td>";
                };
                var createAddButton = function() {
                    return "<button type='button' class='btn' ng-click='add()'>{{'add' | i18n:config.language}}</button>";
                },
                    createUpdateButton = function() {
                        return "<button type='button' class='btn btn-link' ng-click='update()'>{{'update' | i18n:config.language}}</button>";
                    },
                    createEditButton = function() {
                        return "<button type='button' class='btn btn-link' ng-click='edit(field)'>{{'edit' | i18n:config.language}}</button>";
                    },
                    createDeleteButton = function() {
                        return "<button type='button' class='btn btn-link' ng-click='delete(field)'>{{'remove' | i18n:config.language}}</button>";
                    },
                    createActiveButton = function() {
                        return "<button type='button' class='btn btn-link' ng-click='active(field)'>{{field.Active==1?'disable':'enable' | i18n:config.language}}</button>";
                    },
                    createSaveButton = function() {
                        return "<button type='button' class='btn' ng-click='save(data)'>{{'save' | i18n:config.language}}</button>";
                    },
                    createCancelButton = function() {
                        return "<button type='button' class='btn' ng-click='cancel()'>{{'cancel' | i18n:config.language}}</button>";
                    },
                    createClearButton = function() {
                        return "<button type='button' class='btn' ng-click='clear()'>{{'clear' | i18n:config.language}}</button>";
                    },
                    createQueryButton = function() {
                        return "<button type='button' class='btn' ng-click='query()'>{{'query' | i18n:config.language}}</button>";
                    },

                    createEdit = function(sysCurd, sysCurdField, option) {
                        var tds = new Array();
                        tds.push("<table class=\"table edit\" align=\"center\"><tr style='height: 30px;'>");
                        var n = 0,
                            count = sysCurd.EditNumberPerRow,
                            length = sysCurdField.length;
                        angular.forEach(sysCurdField, function(value, key) {
                            if (value.EditVisible == "1") {
                                tds.push(generateByElement._labelRequired(value, option.language));
                                if (value.EditReadOnly == "1") {
                                    tds.push(generateByElement.Label(value, option.language));
                                } else {
                                    tds.push(generateByElement.TextBox(value, option.language));
                                }
                                n++;
                                if (count != 0 && n % count == 0 && key != (length - 1)) {
                                    tds.push("</tr><tr style='height: 30px;'>");
                                    n = 0;
                                }
                            }
                        });
                        tds.push("</tr></table>");
                        return tds.join("");
                    },
                    createAdd = function(sysCurd, sysCurdField, option) {
                        var tds = new Array();
                        tds.push("<table class=\"table add\" align=\"center\"><tr style='height: 30px;'>");
                        var n = 0,
                            count = sysCurd.EditNumberPerRow,
                            length = sysCurdField.length;
                        angular.forEach(sysCurdField, function(value, key) {
                            if (value.AddVisible == "1") {
                                tds.push(generateByElement._labelRequired(value, option.language));
                                if (value.AddReadOnly == "1") {
                                    tds.push(generateByElement.Label(value, option.language));
                                } else {
                                    tds.push(generateByElement.TextBox(value, option.language));
                                }
                                n++;
                                if (count != 0 && n % count == 0 && key != (length - 1)) {
                                    tds.push("</tr><tr style='height: 30px;'>");
                                    n = 0;
                                }
                            }
                        });
                        tds.push("</tr></table>");
                        return tds.join("");
                    },
                    createCondition = function(sysCurd, sysCurdField, option) {
                        var tds = new Array();
                        tds.push("<table class=\"table condition\" align=\"center\"><tr style='height: 30px;'>");
                        var n = 0,
                            count = sysCurd.ConditionNumberPerRow,
                            length = sysCurdField.length;
                        angular.forEach(sysCurdField, function(value, key) {
                            if (value.ConditionVisible == "1") {
                                tds.push(generateByElement._labelRequired(value, option.language));
                                tds.push(generateByElement.TextBox(value, option.language));
                                n++;
                                if (count != 0 && n % count == 0 && key != (length - 1)) {
                                    tds.push("</tr><tr style='height: 30px;'>");
                                    n = 0;
                                }
                            }
                        });
                        tds.push("</tr></table>");
                        return tds.join("");
                    },
                    createPage = function(config) {

                    },
                    createView = function(config) {};

                return {
                    createEdit: createEdit,
                    createAdd: createAdd,
                    createCondition: createCondition,
                    createPage: createPage,
                    createView: createView,
                    createEditButton: createEditButton,
                    createActiveButton: createActiveButton,
                    createDeleteButton: createDeleteButton,
                    createAddButton: createAddButton,
                    createUpdateButton: createUpdateButton,
                    createCancelButton: createCancelButton,
                    createClearButton: createClearButton,
                    createQueryButton: createQueryButton,
                    createTextBox: generateByElement.TextBox,
                    createLabel: generateByElement.Label,
                    createDate: generateByElement.Date,
                    createSelect: generateByElement.Select,
                    createA: generateByElement.A,
                    createTextArea: generateByElement.TextArea,
                    createDialog: generateByElement.Dialog
                };
            }
        ]);
    angular.module("template/modal/window.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/modal/window.html",
                "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
                "    <div class=\"modal-dialog\" ng-style=\"{width:width}\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
                "</div>");
        }
    ]);
})(window, angular)