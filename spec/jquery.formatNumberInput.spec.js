function invalidKeyCode(value) {
  return invalidKeyCode(value, '');
}

function invalidKeyCode(value, currentValue) {
  return invalidKeyCode(value, currentValue, {});
}

function invalidKeyCode(value, currentValue, options) {
  var keyCode = value.charCodeAt(0);
  var defaultOptions = { 'returnMethods': true };
  $.extend(defaultOptions, options);
  return $.fn.formatNumberInput(defaultOptions)['invalidKeyCode'](keyCode, currentValue);
}

function validControlKeyCode(keyCode) {
  return $.fn.formatNumberInput({'returnMethods':true})['invalidKeyCode'](keyCode, '');
}

function formatWithCommas(number) {
  return formatWithCommas(number, {});
}

function formatWithCommas(number, options) {
  var defaultOptions = { 'returnMethods': true };
  $.extend(defaultOptions, options);
  return $.fn.formatNumberInput(defaultOptions)['formatWithCommas'](number);
}

describe('jquery.formatNumberInput', function() {
  it('formatNumberInput plugin should exist', function() {
    expect(jQuery().formatNumberInput).toBeTruthy();
  });
  it('when on blur and val is "-", then it deletes the "-"', function() {
    $('#sample').val('-').blur();
    expect($('#sample').val()).toEqual('');
  });

  describe('internal methods', function() {
    describe('formatWithCommas', function() {
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
      it('when negative 4 digit number with extra negative sign in middle, it deletes extra negative sign', function() {
        expect(formatWithCommas('-123')).toEqual('-123');
      });
      it('when negative sign in middle, it deletes negative sign', function() {
        expect(formatWithCommas('12--3')).toEqual('123');
      });
      it('when negative sign in middle and before a letter, it deletes negative sign', function() {
        expect(formatWithCommas('12a--3')).toEqual('123');
      });
      it('when 2 negative signs at beginning, it deletes second sign', function() {
        expect(formatWithCommas('--123')).toEqual('-123');
      });
      it('when many negative signs at the end, it deletes all of them', function() {
        expect(formatWithCommas('123------------')).toEqual('123');
      });
      it('when negative 7 digit number, it adds 2 commans', function() {
        expect(formatWithCommas('-1234567')).toEqual('-1,234,567');
      });
      it('when letters in value, it removes the letters', function() {
        expect(formatWithCommas('2ko392')).toEqual('2,392');
      });
      it('when maxLength = 8 and more than 8 digits, it truncates down to the first 8 digits', function() {
        expect(formatWithCommas('-12345678901234', {'maxLength': 8})).toEqual('-12,345,678');
      });
      it('when allowNegative = false, then it deletes negative', function() {
        expect(formatWithCommas('-123', {'allowNegative': false})).toEqual('123');
      });
      it('removes leading 0s', function() {
        expect(formatWithCommas('001234')).toEqual('1,234');
        expect(formatWithCommas('-001234')).toEqual('-1,234');
      });
      it('allows a single 0', function() {
        expect(formatWithCommas('0')).toEqual('0');
      });
      it('removes leading 0s on negative number', function() {
        expect(formatWithCommas('-001234')).toEqual('-1,234');
      });
      describe('multiple decimals', function() {
        it('deletes multiple decimals', function() {
          expect(formatWithCommas('123.4.', {'decimalPlaces': 2})).toEqual('123.4');
        });
        it('deletes multiple decimals on negative number', function() {
          expect(formatWithCommas('-123.4.', {'decimalPlaces': 2})).toEqual('-123.4');
        });
      });
      describe('decimalPlaces', function() {
        it('when set to 1, keeps 1 decimal place', function() {
          expect(formatWithCommas('123.45', {'decimalPlaces': 1})).toEqual('123.4');
        });
        it('when set to 2, keeps 2 decimal place', function() {
          expect(formatWithCommas('123.45928', {'decimalPlaces': 2})).toEqual('123.45');
        });
        it('when set to 2, keeps 1 decimal place', function() {
          expect(formatWithCommas('123.4', {'decimalPlaces': 2})).toEqual('123.4');
        });
        it('when set to 2, and no decimals', function() {
          expect(formatWithCommas('123', {'decimalPlaces': 2})).toEqual('123');
        });
        it('when set to 2, and period', function() {
          expect(formatWithCommas('123.', {'decimalPlaces': 2})).toEqual('123.');
        });
      });
      describe('maxLength', function() {
        it('when no maxLength, it allows large numbers', function() {
          expect(formatWithCommas('382,973,829,728,292,832,928')).toEqual('382,973,829,728,292,832,928');
        });
        it('when maxLength = 3 it should trim number larger than 3 digits', function() {
          expect(formatWithCommas('12345', {'maxLength': 3})).toEqual('123');
        });
        it('when maxLength = 3 it should not trim number less than 3', function() {
          expect(formatWithCommas('12', {'maxLength': 3})).toEqual('12');
        });
        describe('allowNegative is true', function() {
          it('should not count the negative sign', function() {
            expect(formatWithCommas('-123', {'maxLength': 3})).toEqual('-123');
          });
        });
        describe('decimalPlace > 0', function() {
          it('when maxLength = 3, decimalPlaces = 2', function() {
            expect(formatWithCommas('123.5',{'maxLength': 3,'decimalPlaces': 2})).toEqual('123.5');
          });
          it('when maxLength =3, decimalPlaces = 2 and there are 4 digits and 2 decimal places', function() {
            expect(formatWithCommas('1234.56',{'maxLength': 3,'decimalPlaces': 2})).toEqual('123.56');
          });
          it('when maxLength =3, decimalPlaces = 2 and there are 4 digits and just a period', function() {
            expect(formatWithCommas('1234.',{'maxLength': 3,'decimalPlaces': 2})).toEqual('123.');
          });
        });
      });
    });
  });

  describe('options', function() {
    describe('allowNegative', function() {
      it('is defaulted to true', function() {
        expect(formatWithCommas('-')).toEqual('-');
      });
    });
    describe('decimalPlaces', function() {
      it('is defaulted to 0', function() {
        expect(formatWithCommas('123.45')).toEqual('123');
      });
      describe('when 0', function() {
        it('deletes trailing periods', function() {
          expect(formatWithCommas('123.',{'decimalPlaces': 0})).toEqual('123');
        });
      });
    });
  });
});
