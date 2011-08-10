function validKeyCode(value) {
	return validKeyCode(value, '');
}

function validKeyCode(value, currentValue) {
	return validKeyCode(value, currentValue, {});
}

function validKeyCode(value, currentValue, options) {
	var keyCode = value.charCodeAt(0);
	var defaultOptions = { 'returnMethods': true };
	$.extend(defaultOptions, options);
	return $.fn.formatNumberInput(defaultOptions)['validKeyCode'](keyCode, currentValue);
}

function validControlKeyCode(keyCode) {
	return $.fn.formatNumberInput({'returnMethods':true})['validKeyCode'](keyCode, '');
}

describe('jquery.formatNumberInput', function() {
	it('formatNumberInput plugin should exist', function() {
		expect(jQuery().formatNumberInput).toBeTruthy();
	});

	describe('internal methods', function() {
		describe('validKeyCode', function() {
			describe('entering invalid characters', function() {
				it('k', function() {
					expect(validKeyCode('k')).toBeFalsy();
				});
				it('z', function() {
					expect(validKeyCode('z')).toBeFalsy();
				});
				it('control characters', function() {
					expect(validControlKeyCode(8)).toBeFalsy('Backspace');
					expect(validControlKeyCode(9)).toBeFalsy('end');
					expect(validControlKeyCode(46)).toBeFalsy('begin');
				});
				it('"-" with non blank currentValue', function() {
					expect(validKeyCode('-', '12')).toBeFalsy();
				});
			});
			describe('entering valid characters', function() {
				it('numbers', function() {
					expect(validKeyCode('0')).toBeTruthy('0');
					expect(validKeyCode('1')).toBeTruthy('1');
					expect(validKeyCode('2')).toBeTruthy('2');
					expect(validKeyCode('3')).toBeTruthy('3');
					expect(validKeyCode('4')).toBeTruthy('4');
					expect(validKeyCode('5')).toBeTruthy('5');
					expect(validKeyCode('6')).toBeTruthy('6');
					expect(validKeyCode('7')).toBeTruthy('7');
					expect(validKeyCode('8')).toBeTruthy('8');
					expect(validKeyCode('9')).toBeTruthy('9');
				});
				it('"-" with blank currentValue', function() {
					expect(validKeyCode('-', '')).toBeTruthy();
				});
			});
		});
		
		describe('formatWithCommas', function() {
			function formatWithCommas(number) {
				return $.fn.formatNumberInput({'returnMethods':true})['formatWithCommas'](number);
			}

			it('when less than 3 digits, it returns original value', function() {
				expect(formatWithCommas('123')).toEqual('123');
			});
			it('when 4 digits, it adds a comma', function() {
				expect(formatWithCommas('1234')).toEqual('1,234');
			});
			it('when 5 digits with comma in wrong place, it correctly moves comma', function() {
				expect(formatWithCommas('1,2345')).toEqual('12,345');
			});
			it('when 7 digits, it adds 2 commas', function() {
				expect(formatWithCommas('1234567')).toEqual('1,234,567');
			});
			it('when 8 digits with commas in wrong place, it correctly moves commas', function() {
				expect(formatWithCommas('1,234,5678')).toEqual('12,345,678');
			});
			it('when negative 3 digit number, it returns original value', function() {
				expect(formatWithCommas('-123')).toEqual('-123');
			});
			it('when negative 7 digit number, it adds 2 commans', function() {
				expect(formatWithCommas('-1234567')).toEqual('-1,234,567');
			});
		});
	});

	describe('options', function() {
		it('allowNegative is defaulted to true', function() {
			expect(validKeyCode('-', '')).toBeTruthy();
		});
		it('when allowNegative is false then negatives are not allowed', function() {
			expect(validKeyCode('-', '', {'allowNegative': false})).toBeFalsy();
		});
	});
});
