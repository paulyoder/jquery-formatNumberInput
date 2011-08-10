describe('jquery.formatNumberInput', function() {
	var $textBox;

	beforeEach(function() {
		$textBox = $('#textbox');
		$textBox.val('');

		this.addMatchers({
			toContainText: function(expected) {
				return this.actual.indexOf(expected) >= 0;
			}
		});

	});

	it('formatNumberInput plugin should exist', function() {
		expect(jQuery().formatNumberInput).toBeTruthy();
	});

	describe('methods', function() {
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
				it('control characters', function() {
					expect(validControlKeyCode(8)).toBeTruthy('Backspace');
					expect(validControlKeyCode(9)).toBeTruthy('end');
					expect(validControlKeyCode(46)).toBeTruthy('begin');
				});
			});
		});
	});

});
