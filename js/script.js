$(function() {

	// Get the form.
	var form = $('#contactform');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});

$(window).on('load', function() {

	var prev = $('.navbar').height();
	var win = $(window);

	$('#more').click(function() {
		$('#responsive').slideToggle("fast");
	});
	
	$(window).resize(function() {

		if($(window).width() > 680) {
			$('#responsive').hide();
		}
	});

	$('#darrow').smoothScroll();
	$('.recentlink').smoothScroll();

	$('#hellodiv').delay(500).fadeIn(1000);

	fadepic();

	$(window).scroll( function() {

		var topWindow = win.scrollTop();

  		$('.navbar').toggleClass('hidden', topWindow > prev);
  		prev = topWindow;
    	
    	fadepic();

    	if ($('#responsive').is(":visible")) {
    		$('#responsive').fadeOut(200);
    	}

    });
});

function fadepic() {
	$('.fadepic').each( function(i){
        var objectTop = $(this).offset().top;
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();
        var windowTop = $(window).scrollTop();

        if( windowBottom > objectTop + 50){
            $(this).animate({'opacity':'1'}, 400);
        }

    }); 
}



