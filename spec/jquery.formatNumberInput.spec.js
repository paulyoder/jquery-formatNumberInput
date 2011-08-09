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
		describe('validKeypress', function() {
			function validKeypress(value) {
				var keyCode = value.charCodeAt(0);
				return $.fn.formatNumberInputMethods['validKeypress'](keyCode, '');
			}
			function validKeypress(value, currentValue) {
				var keyCode = value.charCodeAt(0);
				return $.fn.formatNumberInputMethods['validKeypress'](keyCode, currentValue);
			}
			describe('entering invalid characters', function() {
				describe('alphabet', function() {
					it('"k"', function() {
						expect(validKeypress('k')).toBeFalsy();
					});
					it('"z"', function() {
						expect(validKeypress('z')).toBeFalsy();
					});
					it('- with non blank currentValue', function() {
						expect(validKeypress('-', '12')).toBeFalsy();
					});
				});
			});
			describe('entering valid characters', function() {
				it('numbers', function() {
					expect(validKeypress('0')).toBeTruthy('0');
					expect(validKeypress('1')).toBeTruthy('1');
					expect(validKeypress('2')).toBeTruthy('2');
					expect(validKeypress('3')).toBeTruthy('3');
					expect(validKeypress('4')).toBeTruthy('4');
					expect(validKeypress('5')).toBeTruthy('5');
					expect(validKeypress('6')).toBeTruthy('6');
					expect(validKeypress('7')).toBeTruthy('7');
					expect(validKeypress('8')).toBeTruthy('8');
					expect(validKeypress('9')).toBeTruthy('9');
				});
				it('- with blank currentValue', function() {
					expect(validKeypress('-', '')).toBeTruthy();
				});
			});
		});
	});

});
