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

/*
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
}*/

window.onload = function() {

	var navbar = getNavbar();

	//Navbar height needed for getNavbar function at the bottom
	var prev = navbar.clientHeight;

	//Variables used to slide the responsive navbar
	var hamburger = document.getElementById('more');
	var responsiveMenu = document.getElementById('responsive');
	var navOpen = false;
	var initialHeight = 200;

	//.5s delay and then fade in the intro text
	var introOverlay = document.getElementById('hellodiv');
	if(introOverlay) {
		setTimeout(fadeIn(introOverlay), 500);
	}

	//Fade in pictures on reload 
	fadePic();
	
	/***********
					   EVENT LISTENERS
												************/

	hamburger.addEventListener('click', function() {
		slideNav();
	});

	window.addEventListener('scroll', function() {
		hideNavbar();

		if (navOpen) {
			slideNav();
		}

		fadePic();
	});

	window.addEventListener('resize', function() {

		//Close responsive navigation if it's open and resizing over tablet width
		if (window.innerWidth > 680 && navOpen) {
			slideNav();
		}
	});

	/***********
					   	  FUNCTIONS
											    ************/

	function getNavbar() {
		var classArray = document.getElementsByClassName('navbar');
		return classArray[0];
	}

	function hideNavbar() {
		var topOfWindow = (window.pageYOffset !== undefined) ? window.pageYOffset : 
						  (document.documentElement || document.body.parentNode || 
						   document.body).scrollTop;
		if (topOfWindow > prev) {
			if (navbar.className != 'navbar hidden') {
				navbar.className += ' hidden';
			}
		}
		else {
			navbar.className = 'navbar';
		}
		prev = topOfWindow;
	}

	//Toggles the responsive navigation sliding it up or down
	function slideNav() {
		var rnavLinks = document.getElementsByClassName('rnav');
		var linkTags = responsiveMenu.getElementsByTagName('a');

		if (navOpen) {
			navOpen = false;
			responsiveMenu.style.height = '0px';
			for (var i = 0; i < rnavLinks.length; i++) {
				rnavLinks[i].style.height = '0px';
				linkTags[i].style.display = 'none';
			}
		}

		else {
			navOpen = true;
			responsiveMenu.style.height = initialHeight + 'px';
			for (var i = 0; i < rnavLinks.length; i++) {
				rnavLinks[i].style.height = '5rem';
				linkTags[i].style.display = 'inline-block';
			}
		}
	}

	function fadeIn(element) {
		element.style.display = 'block';
		element.style.opacity = 0;

		var step = function() {
			element.style.opacity = +element.style.opacity + 0.03;


		    if (+element.style.opacity < 1) {
		      (window.requestAnimationFrame && requestAnimationFrame(step)) || setTimeout(step, 16);
		    }
		};
		step();
	}

	/*****
		    Fades the element in when the bottom of window reaches 
		    50px after element's top position by calling fadeIn()
		   														    *****/
	function fadePic() {
		var windowBottom = window.pageYOffset + window.innerHeight;
		var fadedItems = document.getElementsByClassName('fadepic');
		var elementBounds;
		var elementTop;
		for (var i = 0; i < fadedItems.length; i++) {
			elementBounds = fadedItems[i].getBoundingClientRect();
			elementTop = elementBounds.top + window.pageYOffset - document.body.clientTop;
			if (windowBottom > elementTop + 50 && +fadedItems[i].style.opacity == 0) {
				fadeIn(fadedItems[i]);
			}
		}
		
	}
};



