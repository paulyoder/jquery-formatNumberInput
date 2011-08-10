(function($) {
	var validKeys = [48,49,50,51,52,53,54,55,56,57]
	var negativeKey = 45;
	var allowNegative;
	var maxLength;

	var methods = {
		validKeyCode: function(keyCode, currentValue) {
			if (maxLength > 0 && currentValue.replace(/[^0-9]/g,'').length >= maxLength) { return false; }
			if (keyCode == negativeKey && allowNegative) { return currentValue == ''; }
			return (validKeys.indexOf(keyCode) >= 0);
		},
		formatWithCommas: function(number) {
			return number.replace(/[^-0-9]/g, '')
									 .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		}
	};	

	$.fn.formatNumberInput = function(options) {
		var settings = { 
			'allowNegative': true,
	 		'maxLength': 0
		};
		$.extend(settings, options);
		allowNegative = settings['allowNegative'];
		maxLength = settings['maxLength'];
		if (settings['returnMethods'] == true) { return methods; }
		
		return this.keypress(function(e) {
			//have to reset allowNegative variable since it went out of scope
			allowNegative = settings['allowNegative'];
			maxLength = settings['maxLength'];
			var currentValue = $(this).val();
			if (!methods['validKeyCode'](e.which, currentValue)) {
				e.preventDefault();
			}
		}).keyup(function() {
			var origNumber = $(this).val();
			var newNumber = methods['formatWithCommas'](origNumber);
			if (newNumber != origNumber) { $(this).val(newNumber); }
		});
	}
})(jQuery);
