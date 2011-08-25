(function($) {
  var negativeKey = 45;
  var allowNegative;
  var maxLength;

  var methods = {
    invalidKeyCode: function(keyCode, currentValue) {
      return (maxLength > 0 &&
              currentValue.replace(/[^0-9]/g,'').length >= maxLength &&
              keyCode != negativeKey);
    },
    formatWithCommas: function(number) {
      //scrub number
      number = number.replace(/[^-0-9]/g,'')           //delete non negative and non numbers
                     .replace(/--+/g,'-')              //delete multiple negatives
                     .replace(/(\d)-/g,'$1')           //delete negatives in middle of number
                     .replace(/^(-?)0+(\w)/g,'$1$2');  //delete leading zeros but allow single 0

      if (maxLength > 0) { 
        //make sure there are not more numbers than the maxLength
        var regEx = new RegExp("\\d+(\\d{" + maxLength + "}$)", 'g');
        number = number.replace(regEx,'$1'); 
      }
      if (!allowNegative) { number = number.replace(/-/g,''); }
      //add commas before returning
      return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
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
      //have to reset variables since they went out of scope
      allowNegative = settings['allowNegative'];
      maxLength = settings['maxLength'];
      var currentValue = $(this).val();
      if (methods['invalidKeyCode'](e.which, currentValue)) {
        e.preventDefault();
      }
    }).keyup(function() {
      var origNumber = $(this).val();
      var newNumber = methods['formatWithCommas'](origNumber);
      if (newNumber != origNumber) { $(this).val(newNumber); }
    }).blur(function() {
      var number = methods['formatWithCommas']($(this).val());
      if (number == '-') { $(this).val(''); }
    });
  }
})(jQuery);
