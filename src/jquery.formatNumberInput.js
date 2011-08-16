(function($) {
  var validKeys = [45,48,49,50,51,52,53,54,55,56,57]
  var negativeKey = 45;
  var allowNegative;
  var maxLength;

  var methods = {
    validKeyCode: function(keyCode, currentValue) {
      if (maxLength > 0 && currentValue.replace(/[^0-9]/g,'').length >= maxLength) { return false; }
      if (keyCode == negativeKey && !allowNegative) { return false; }
      else { return ($.inArray(keyCode, validKeys) >= 0); }
    },
    formatWithCommas: function(number) {
      //scrub number
      number = number.replace(/[^-0-9]/g,'')     //delete non negative and non numbers
                     .replace(/--+/g,'-')        //delete multiple negatives
                     .replace(/(\d)-/g,'$1')     //delete negatives in middle of number
                     .replace(/^(-?)0+/g,'$1');  //delete leading zeros 

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
      if (!methods['validKeyCode'](e.which, currentValue)) {
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
