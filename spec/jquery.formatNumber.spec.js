describe('jquery.formatNumber', function() {
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

	it('should pass', function() {
		expect($textBox).toExist();
	});

});
