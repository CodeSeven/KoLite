// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

;(function (ko) {
        ko.asyncCommand = function (options) {
            var
                self = ko.observable(),
                canExecuteDelegate = options.canExecute,
                executeDelegate = options.execute,

                completeCallback = function () {
                    self.isExecuting(false);
                };

            self.isExecuting = ko.observable();

            self.canExecute = ko.computed(function () {
                return canExecuteDelegate ? canExecuteDelegate(self.isExecuting()) : true;
            });

            self.execute = function (argument) {
                var args = []; // Allow for this argument to be passed on to execute delegate
                if (executeDelegate.length === 2) {
                    args.push(argument);
                }

                args.push(completeCallback);
                self.isExecuting(true);
                executeDelegate.apply(this, args);
            };
            return self;
        };
    })(ko);