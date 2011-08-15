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
        it('"-" when allowNegative is false', function() {
          expect(validKeyCode('-', '', {'allowNegative': false})).toBeFalsy();
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
        it('"-" when allowNegative is true', function() {
          expect(validKeyCode('-', '929')).toBeTruthy();
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
        expect(validKeyCode('-', '')).toBeTruthy();
      });
      it('when allowNegative is false then negatives are not allowed', function() {
        expect(validKeyCode('-', '', {'allowNegative': false})).toBeFalsy();
      });
    });
    describe('maxLength', function() {
      it('when maxLength is not pass in, it allows large numbers', function() {
        expect(validKeyCode('8', '382,973,829,728,292,832,928')).toBeTruthy();
      });
      it('when maxLength = 3 and currentValue.length = 3, validKeyCode should return false', function() {
        expect(validKeyCode('8', '333', {'maxLength': 3})).toBeFalsy();
      });
      it('when maxLength = 5 and currentValue = "1,234", validKeyCode should return true', function() {
        expect(validKeyCode('8', '1,234', {'maxLength': 5})).toBeTruthy();
      });
      it('when maxLength = 5 and currentValue = "-1,234", validKeyCode should return true', function() {
        expect(validKeyCode('8', '-1,234', {'maxLength': 5})).toBeTruthy();
      });
    });
  });
});
