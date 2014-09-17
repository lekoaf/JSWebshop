function validate(formSelector){

	var validators = {
		string: function(element){
			var val = element.val();
			return (val && typeof val == 'string' && val.length > 0); 
		},
		email: function(element){
			var val = element.val();
			var re = /\S+@\S+\.\S+/;
    		return re.test(val);
		},
		number: function(element){
			var val = element.val();
			return (val && !isNaN(val) && val.length > 0);
		}
	};

	var inputs = $(formSelector).find('[data-validate-as]');
	var numberOfCorrectValidations = 0;

	inputs.each(function (index, element){

		element = $(element);

		var validator = element.attr('data-validate-as');
		var isValid = validators[validator](element);

		if (!isValid){
			element.addClass('validation-failed');
			element.parent().parent().addClass('has-error');
		}
		else if((++numberOfCorrectValidations) == inputs.length){
			$(formSelector).submit();
		}
		else{
			element.addClass('validation-failed');
			element.parent().parent().addClass('has-success');
		}

	});
}