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
	$('#more').click(function() {
		$('#responsive').slideToggle("fast");
	});
	
	$(window).resize(function() {

		if($(window).width() > 680) {
			$('#responsive').hide();
		}

		windowMockCheck();


	});

	windowMockCheck();

	$('#darrow').smoothScroll();

	$('#hellodiv').delay(500).fadeIn(1000);

	fillbar();

	fadepic();

	$(window).scroll( function(){
 
        fillbar();
    	
    	fadepic();

    });
});

function fillbar() {
	$('.barfill').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
               	if($(this).is('#graphicbar')) {
               		$('#graphicbar').stop().animate({'width': "98%"}, 500);
               	}
               	if($(this).is('#webbar')) {
               		$('#webbar').stop().animate({'width': "95%"}, 500);
               	}  
               	if($(this).is('#clientbar')) {
               		$('#clientbar').stop().animate({'width': "98%"}, 500);
               	}  
               	if($(this).is('#javabar')) {
               		$('#javabar').stop().animate({'width': "70%"}, 500);
               	}  
            }

            else {
            	if($(this).is('#graphicbar')) {
               		$('#graphicbar').stop().animate({'width': "0"}, 500);
               	}
               	if($(this).is('#webbar')) {
               		$('#webbar').stop().animate({'width': "0"}, 500);
               	}  
               	if($(this).is('#clientbar')) {
               		$('#clientbar').stop().animate({'width': "0"}, 500);
               	}  
               	if($(this).is('#javabar')) {
               		$('#javabar').stop().animate({'width': "0"}, 500);
               	} 
            }
        });
}

function windowMockCheck() {
	if ($(window).width() >= 623) {
		$('#latinnightmock img').css("width", "auto");
		$('#sanantoniomock img').css("width", "auto");
	}

	else {
		$('#latinnightmock img').css("height", "auto");
		$('#latinnightmock img').css("width", "100%");
		$('#sanantoniomock img').css("height", "auto");
		$('#sanantoniomock img').css("width", "100%");
	}
}

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



