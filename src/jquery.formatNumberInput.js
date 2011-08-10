(function($) {
	var validKeys = [8,48,49,50,51,52,53,54,55,56,57]
	var negativeKey = 45;
	var allowNegative = true;

	var methods = {
		validKeyCode: function(keyCode, currentValue) {
			if (keyCode == negativeKey && allowNegative) { return currentValue == ''; }
			else { return (validKeys.indexOf(keyCode) >= 0); }
		},
		formatWithCommas: function(number) {
			return number.replace(',', '')
									 .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		}
	};	

	$.fn.formatNumberInput = function(options) {
		var settings = { 'allowNegative': true };
		$.extend(settings, options);

		allowNegative = settings['allowNegative'];
		if (settings['returnMethods'] == true) { return methods; }
	}
})(jQuery);

/*
(function ($) {
        var methods = {
            addCommas: function (number) {
                return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
        };

        $.fn.formatCurrency = function (options) {
            var settings = { 'allowNegative': false };
            $.extend(settings, options);

            var validCurrencyKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
            if (settings['allowNegative']) {
                validCurrencyKeys.push(45);
            }
            return this.keypress(function (e) {
                if (jQuery.inArray(e.which, validCurrencyKeys) == -1) {
                    e.preventDefault();
                }
                else if (e.which == 45 && $(this).val() != '') {
                    e.preventDefault();
                }
            }).keyup(function () {
                var $this = $(this);
                var number = $this.val().replace(/,/g, '');
                $this.val(methods['addCommas'](number));
            });
        }
})(jQuery);
*/
