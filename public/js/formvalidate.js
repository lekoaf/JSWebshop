function validate(formSelector){

	// Perhaps validating one input at a time
	// with .blur() and update error/success.

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
			element.parent().parent().removeClass('has-error');
			element.parent().parent().addClass('has-success');
			console.log("Form success");
			return true;
		}
		else{
			element.parent().parent().removeClass('has-error');
			element.parent().parent().addClass('has-success');
		}

	});
}

function sendorder(){

	// If basket is empty, do not send

	var data = {
		fName: $("#inFirst").val(),
		lName: $("#inLast").val(),
		street: $("#inStreet").val(),
		zip: $("#inZip").val(),
		city: $("#inCity").val(),
		email: $("#inEmail").val(),
		phone: $("#inPhone").val(),
		basket: SKWEBSHOP.getBasket()
	};

	var ajaxOptions = {
        processData: false,
        dataType: 'json',
        contentType: 'application/json',
        success : sendOrderSuccess,
        error : sendOrderError,
        type: 'POST',
        data: data
    };

    $.ajax('/send', ajaxOptions);

    function sendOrderSuccess(data, msg, jqxhr){
    	console.log("sendOrderSuccess");
    	console.log(data);
    	console.log(msg);
    	console.log(jqxhr);

    	// Clear out form
    	$("#inFirst").val(""),
		$("#inLast").val(""),
		$("#inStreet").val(""),
		$("#inZip").val(""),
		$("#inCity").val(""),
		$("#inEmail").val(""),
		$("#inPhone").val(""),

		// Close modal
		$('#basketModal').modal();

		// Empty basket and local storage
		$(".basketicon").html("0");
		
		var b = SKWEBSHOP.getBasket();
		
		$.each(b, function (key, val){
			SKWEBSHOP.deleteFromBasket(val.item);
		});
		
		SKWEBSHOP.deleteStorage();
    }

    function getItemError(jqxhr, status, error){
    	console.log("sendOrderError");
    	console.log(jqxhr);
    	console.log(status);
    	console.log(error);
    }
}