    /**
     * elvinTable.page Module
     *
     * Description
     */
    angular.module('elvinTable.page', [])
        .controller('PageCtrl', ['$scope',
            function($scope) {

            }
        ]);
    angular.module('elvinTable/template/TextBox.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/TextBox.html', '');

        }
    ]);
    angular.module('elvinTable/template/Select.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/Select.html', '');
        }
    ]);
    angular.module('elvinTable/template/A.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/A.html', '');
        }
    ]);
    angular.module('elvinTable/template/CheckBox.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/CheckBox.html', '');
        }
    ]);
    angular.module('elvinTable/template/Dialog.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/Dialog.html', '');
        }
    ]);
    angular.module('elvinTable/template/TextArea.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/TextArea.html', '');
        }
    ]);
    angular.module('elvinTable/template/Datepicker.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/Datepicker.html', '');
        }
    ]);
    angular.module('elvinTable/template/StartDate.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/StartDate.html', '');
        }
    ]);
    angular.module('elvinTable/template/EndDate.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/EndDate.html', '');
        }
    ]);
    angular.module('elvinTable/template/DateRange.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/DateRange.html', '');
        }
    ]);
    angular.module('elvinTable/template/Label.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/Label.html', '');
        }
    ]);
    angular.module('elvinTable/template/AddButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/AddButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/EditButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('elvinTable/template/EditButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/UpdateButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/UpdateButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/CancelButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/CancelButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/EnableButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/EnableButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/DisableButton.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/DisableButton.html', '');
        }
    ]);
    angular.module('elvinTable/template/DefaultHeader.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/DefaultHeader.html', '');
        }
    ]);
    angular.module('elvinTable/template/ActionHeader.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/ActionHeader.html', '');
        }
    ]);
    angular.module('elvinTable/template/SelectAllCheckbox.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/SelectAllCheckbox.html', '');
        }
    ]);
    angular.module('elvinTable/template/Page.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/Page.html', '');
        }
    ]);
    /**
     *  module
     *
     * Description
     */
    angular.module('elvinTable.localization', [])
        .filter("i18n", ['localizedTexts', '$rootScope',
            function(localizedTexts, $rootScope) {
                return function(text) {
                    var currentLanguage = $rootScope.language || $rootScope.config.language || 'en';
                    if (localizedTexts[currentLanguage].hasOwerProperty(text)) {
                        return localizedTexts[currentLanguage][text];
                    }
                    return text;
                }
            }
        ])
        .value('localizedTexts', {
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
                exportPDF: "导出PDF"
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
                exportPDF: "Export PDF"
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
                exportPDF: "導出 PDF"
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
                exportPDF: "輸出 PDF"
            }
        });
        /**
    *  Module
    *
    * Description
    */
    angular.module('elvinTable/template/DiggPage.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('<div class=\"row-fluid\">' +
                                            '<div style="float: left;color: Black">' +
                                                '<span style=\"float: left;\" data-bind=\"text:$root.language.pagemsg1\">' +
                                                "{{'pagemsg1' | localizedTexts}}</span> " +
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
                                             '<div style="margin-right:10px;float: right;color: Black">' +
                                                 "<a data-bind=\"click:page.firstPage,text:$root.language.firstpage\">首页</a><span style='margin:0 4px;'>|</span>" +
                                                 "<a data-bind=\"click:page.prevPage,text:$root.language.prevpage\">上页</a><span style='margin:0 4px;'>|</span>" +
                                                 "<a data-bind=\"click:page.nextPage,text:$root.language.nextpage\">下页</a><span style='margin:0 4px;'>|</span>" +
                                                 "<a data-bind=\"click:page.lastPage,text:$root.language.lastpage\">末页</a>" +
                                             "</div>" +
                                        "</div>");
        }
    ]);