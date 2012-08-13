// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

;(function($) {
    "use strict";

    /* ACTIVITY INDICATOR EXTENDED CLASS DEFINITION
    * ========================= */
    var Indicator = function($element) {
        this.$element = $element;
        this.onlyIcon = this.$element.contents().length === 1 && this.$element.children('i').length === 1;
        this.activityText = this.$element.data('activity-text');
        this.isIndicatorOnly = this.$element.is('i');
        this.icons = this.$element.children('i');
    };

    Indicator.prototype = {
        createTemporaryIcon: function() {
            if (this.onlyIcon)
                return;
            this.temporaryIcon = $('<i class="icon-" style="padding-left: 5px"></i>');
            this.$element.append(this.temporaryIcon);
        },

        hideExistingIcons: function() {
            if (this.onlyIcon)
                this.icons.css('visibility', 'hidden');
        },

        moveSpinnerToFront: function() {
            $('body > div, body > group').first().css('z-index', 9999);
        },

        removeTemporaryIcon: function() {
            if (!this.temporaryIcon)
                return;

            this.temporaryIcon.remove();
            this.temporaryIcon = null;
        },

        setText: function(state) {
            if (!this.activityText)
                return;
            var data = this.$element.data(),
                val = this.$element.is('input') ? 'val' : 'html';
            if (state === 'activity')
                this.$element.data('resetText', this.$element[val]());
            this.$element[val](data[state + 'Text']);
        },

        showExistingIcons: function() {
            this.icons.css('visibility', 'visible');
        },

        start: function() {
            this.isBusy = true;
            this.setText('activity');
            this.createTemporaryIcon();
            this.hideExistingIcons();
            if (this.$element.is('button'))
                this.$element.addClass('disabled').attr('disabled', 'disabled');
            this.$element.activity({
                align: this.onlyIcon || this.isIndicatorOnly ? 'center' : 'right',
                length: this.isIndicatorOnly ? 5 : 2,
                padding: 12,
                outside: true,
                segments: this.isIndicatorOnly ? 12 : 10,
                space: this.isIndicatorOnly ? 2 : 1,
                width: 1.5
            });
            this.moveSpinnerToFront();
        },

        stop: function() {
            this.removeTemporaryIcon();
            this.showExistingIcons();
            this.isBusy = false;
            this.setText('reset');
            this.$element.activity(false);
            this.$element.removeClass('disabled').removeAttr('disabled');
        },

        update: function(isLoading) {
            if (isLoading && !this.isBusy) {
                this.start();
            }

            if (!isLoading && this.isBusy) {
                this.stop();
            }
        }
    };

    /* ACTIVITY INDICATOR EXTENDED PLUGIN DEFINITION
    * ========================== */

    $.fn.activityEx = function(isLoading) {
        var activity = function($element) {
            if (!isLoading) {
                $element.activity(false);
                return;
            }

            var length = Math.round($element.height() / 4);
            var isInput = $element.is('input');

            $element.activity({
                align: $element.is('input') ? 'right' : 'center',
                length: length,
                padding: isInput ? length : 0,
                outside: true,
                segments: Math.max(10, 10 + (length - 5)),
                space: 1,
                width: 1.5
            });
            $('body > div').first().css('z-index', 9999);
        },
            buttonActivity = function($element) {
                var data = $element.data('activityEx');
                if (!data)
                    $element.data('activityEx', (data = new Indicator($element)));
                data.update(isLoading);
            };
        return this.each(function() {
            $(this).is('button, input, a') ? buttonActivity($(this)) : activity($(this));
        });
    };
})(jQuery);


;(function ($, ko) {
    ko.bindingHandlers.activity = {
        init: function (element) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).activityEx(false);
            });
        },

        update: function (element, valueAccessor) {
            var activity = valueAccessor()();
            typeof activity !== 'boolean' || $(element).activityEx(activity);
        }
    };
})(jQuery, ko);