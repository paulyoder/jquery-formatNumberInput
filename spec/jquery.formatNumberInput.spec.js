describe('jquery.formatNumberInput', function() {
	it('formatNumberInput plugin should exist', function() {
		expect(jQuery().formatNumberInput).toBeTruthy();
	});

	describe('internal methods', function() {
		describe('validKeyCode', function() {
			function validKeyCode(value) {
				var keyCode = value.charCodeAt(0);
				return $.fn.formatNumberInput('returnMethods')['validKeyCode'](keyCode, '');
			}
			function validKeyCode(value, currentValue) {
				var keyCode = value.charCodeAt(0);
				return $.fn.formatNumberInput('returnMethods')['validKeyCode'](keyCode, currentValue);
			}
			function validControlKeyCode(keyCode) {
				return $.fn.formatNumberInput('returnMethods')['validKeyCode'](keyCode, '');
			}
			describe('entering invalid characters', function() {
				it('k', function() {
					expect(validKeyCode('k')).toBeFalsy();
				});
				it('z', function() {
					expect(validKeyCode('z')).toBeFalsy();
				});
				it('- with non blank currentValue', function() {
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
				it('- with blank currentValue', function() {
					expect(validKeyCode('-', '')).toBeTruthy();
				});
				/*
				it('control characters', function() {
					expect(validControlKeyCode(8)).toBeTruthy('Backspace');
					expect(validControlKeyCode(9)).toBeTruthy('end');
					expect(validControlKeyCode(46)).toBeTruthy('begin');
				});
				*/
			});
		});
		
		describe('formatWithCommas', function() {
			function formatWithCommas(number) {
				return $.fn.formatNumberInput('returnMethods')['formatWithCommas'](number);
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
			it('when negative 3 digit number, it returns original value', function() {
				expect(formatWithCommas('-123')).toEqual('-123');
			});
			it('when negative 7 digit number, it adds 2 commans', function() {
				expect(formatWithCommas('-1234567')).toEqual('-1,234,567');
			});
		});
	});

});
