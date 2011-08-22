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
    describe('invalidKeyCode', function() {
      describe('maxLength', function() {
        it('when maxLength is not pass in, it allows large numbers', function() {
          expect(invalidKeyCode('8', '382,973,829,728,292,832,928')).toBeFalsy();
        });
        it('when maxLength = 3 and currentValue.length = 3, invalidKeyCode should return false', function() {
          expect(invalidKeyCode('8', '333', {'maxLength': 3})).toBeTruthy();
        });
        it('when maxLength = 5 and currentValue = "1,234", invalidKeyCode should return true', function() {
          expect(invalidKeyCode('8', '1,234', {'maxLength': 5})).toBeFalsy();
        });
        it('when maxLength = 5 and currentValue = "-1,234", invalidKeyCode should return true', function() {
          expect(invalidKeyCode('8', '-1,234', {'maxLength': 5})).toBeFalsy();
        });
      });
      describe('allowNegative is false', function() {
        it('when at max length, it still allows a negative', function() {
          expect(invalidKeyCode('-', '123', {'allowNegative': true, 'maxLength': 3})).toBeFalsy();
        });
      });
    });
    
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
      it('when maxLength = 8 and more than 8 digits, it truncates down to the last 8 digits', function() {
        expect(formatWithCommas('-1234568901234', {'maxLength': 8})).toEqual('-68,901,234');
      });
      it('when allowNegative = false, then it deletes negative', function() {
        expect(formatWithCommas('-123', {'allowNegative': false})).toEqual('123');
      });
      it('removes leading 0s', function() {
        expect(formatWithCommas('001234')).toEqual('1,234');
      });
      it('removes leading 0s on negative number', function() {
        expect(formatWithCommas('-001234')).toEqual('-1,234');
      });
    });
  });

  describe('options', function() {
    describe('allowNegative', function() {
      it('allowNegative is defaulted to true', function() {
        expect(invalidKeyCode('-', '')).toBeFalsy();
      });
    });
  });
});
