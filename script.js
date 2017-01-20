$(document).ready(function() {
	$(".fancybox").fancybox( {
		openEffect	: 'none',
		closeEffect	: 'none',
	});
});

$(document).ready(function() {
	$('#more').click(function() {
		$('#responsive').slideToggle("fast");
	});
	
	$(window).resize(function() {
		if($(window).width() > 590) {
			$('#responsive').hide();
		}
	});
	
	$("#djpic").css("display", "inline-block");
});

