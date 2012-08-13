// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

;(function ($, ko) {
    ko.bindingHandlers.command = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = valueAccessor();
            var commands = value.execute ? { click: value } : value;
            var events = {};
            for (var command in commands) {
                events[command] = commands[command].execute;
            }

            ko.bindingHandlers.event.init(element, ko.utils.wrapAccessor(events), allBindingsAccessor, viewModel);
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var commands = valueAccessor();
            var canExecute = commands.canExecute || (commands.click ? commands.click.canExecute : null);
            if (!canExecute) {
                return;
            }

            //ko.bindingHandlers.enable.update(element, ko.utils.wrapAccessor(canExecute()), allBindingsAccessor, viewModel);
            ko.bindingHandlers.enable.update(element, canExecute, allBindingsAccessor, viewModel);
        }
    };
})(jQuery, ko);