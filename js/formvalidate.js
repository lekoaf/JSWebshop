function validate(formSelector){

	var validators = {
		map:{
			" ": "",
			"-": ""
		},
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
			for (prop in this.map){
				val = val.split(prop).join(this.map[prop]);
			}
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
			element.parent().parent().addClass('has-success');
			element.parent().parent().addClass('has-error');
		}
		else if((++numberOfCorrectValidations) == inputs.length){
			// $(formSelector).submit();
			console.log("Form success");
		}
		else{
			element.parent().parent().removeClass('has-error');
			element.parent().parent().addClass('has-success');
		}

	});
}