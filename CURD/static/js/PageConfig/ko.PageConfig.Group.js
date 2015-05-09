//PageConfig v1.0
//Copyright 2013 Galaxy Point Inc. All Rights Reserved
//Required knockoutjs,jquery library
(function () {
    ko.bindingHandlers.enableGroup = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.registerEventHandler(element, "click", function () {
                var value = valueAccessor();
                value(!value());
            });
        }
    };
})();