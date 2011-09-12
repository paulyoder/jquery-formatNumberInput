(function($) {
  var negativeKey = 45;
  var allowNegative;
  var maxLength;
  var decimalPlaces;

  var methods = {
    formatWithCommas: function(number) {
      //scrub number
      number = number.replace(/[^-\.0-9]/g,'')            //only keep numbers, negative and decimal
                     .replace(/--+/g,'-')                 //delete multiple negatives
                     .replace(/^(-?\d*\.\d*)\..*$/g,'$1') //only allow one decimal
                     .replace(/(\d)-/g,'$1')              //delete negatives in middle of number
                     .replace(/^(-?)0+(\w)/g,'$1$2');     //delete leading zeros but allow single 0

      if (maxLength > 0) { 
        //make sure there are not more numbers than the maxLength
        var regEx = new RegExp("^(-?\\d{" + maxLength + "})\\d*(\\.\\d*)?$", 'g');
        number = number.replace(regEx,'$1$2'); 
      }

      if (!allowNegative) { number = number.replace(/-/g,''); }

      if (decimalPlaces == 0) { number = number.replace(/\.\d*/g,''); }
      else { 
        var regEx = new RegExp("(\\.\\d{" + decimalPlaces + "})\\d+$", 'g');
        number = number.replace(regEx,'$1');
      }

      //add commas before returning
      return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
    }
  };  

  $.fn.formatNumberInput = function(options) {
    var settings = { 
      'allowNegative': true,
      'maxLength': 0,
      'decimalPlaces' : 0
    };
    $.extend(settings, options);
    allowNegative = settings['allowNegative'];
    maxLength = settings['maxLength'];
    decimalPlaces = settings['decimalPlaces'];
    if (settings['returnMethods'] == true) { return methods; }
    
    return this.keyup(function() {
      allowNegative = settings['allowNegative'];
      maxLength = settings['maxLength'];
      decimalPlaces = settings['decimalPlaces'];
      var origNumber = $(this).val();
      var newNumber = methods['formatWithCommas'](origNumber);
      if (newNumber != origNumber) { $(this).val(newNumber); }
    }).blur(function() {
      var number = methods['formatWithCommas']($(this).val());
      if (number == '-') { $(this).val(''); }
    });
  }
})(jQuery);
