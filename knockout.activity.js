// By: Hans Fjällemark and John Papa
// Rewritten by Alex Cornejo
// https://github.com/CodeSeven/KoLite
//
(function (factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        define(["knockout", "exports"], factory);
    } else {
        factory(ko, ko);
    }
}(function (ko, exports) {
    if (typeof (ko) === undefined) {
        throw 'Knockout is required, please ensure it is loaded before loading the dirty flag plug-in';
    }

    var defaultOptions = {
      container: 'i',
      activityClass: 'fa fa-spinner fa-spin',
      inactiveClass: ''
    };

    function getOptions(poptions) {
      var options = {};
      for (var p in defaultOptions)
        if (defaultOptions.hasOwnProperty(p))
          if (poptions && poptions.hasOwnProperty(p))
            options[p] = poptions[p];
          else
            options[p] = defaultOptions[p];
      return options;
    }

    ko.bindingHandlers.activity = {
        init: function (element, valueAccessor, allBindingsAccessor) {
          var options = getOptions(allBindingsAccessor().activityOptions);
          var activity_indicator = document.createElement(options.container);
          element._activity_indicator = activity_indicator;
          element.insertBefore(activity_indicator, element.firstChild);
          ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            element.removeChild(activity_indicator);
            delete element._activity_indicator;
          });
        },

        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = getOptions(allBindingsAccessor().activityOptions);
            var value = ko.utils.unwrapObservable(valueAccessor());
            var activity = typeof value === "function" ? value() : value;

            if (activity) 
              element._activity_indicator.className = options.activityClass;
            else
              element._activity_indicator.className = options.inactiveClass;
        }
    };

}));
