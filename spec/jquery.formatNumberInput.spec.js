describe('jquery.formatNumberInput', function() {
	var $textBox;

	beforeEach(function() {
		jasmine.getFixtures().set('<input id="textbox" type="text" />');

		this.addMatchers({
			toContainText: function(expected) {
				return this.actual.indexOf(expected) >= 0;
			}
		});

		$textBox = $('#textbox');
	});

	it('should exist', function() {
		expect(jQuery().formatNumberInput).toBeTruthy();
	});

});
