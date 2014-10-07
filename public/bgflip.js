(function ($){
	$.fn.bgflip = function(options) {
		
		var settings = $.extend({
			action: 'start',
			looptime: 1000
		}, options);

		var loop = false;

		if (settings.action == 'start'){
			loop = true;
		}
		
		while (loop){
			if (typeof options.img == 'array'){
				for (var i = 0; i < options.img.length; i++){
					setTimeout(function(){
						this.attr('src') = options.img[i];
					}, settings.looptime);
				}

			} else {
				var img = options.img.split('.');
				for (var i = 0; i < options.no; i++){
					setTimeout(function(){
						this.attr('src') = img[0] + i + '.' + img[1];
					}, settings.looptime);
				}
			}
		}
	}
})(jQuery);

$('#bg').bgflip({
	action: 'start'
	img: 'bg.jpg',
	no: 5,
	looptime: 1000
})