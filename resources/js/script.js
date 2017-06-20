$(document).ready(function () {

    // NAVBAR SIZE CHANGE //

    $(window).scroll(function () {
        if ($(document).scrollTop() > 300) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
    });


    // NAVBAR LINK SCROLL //

    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 700, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    // WAYPOINT ANIMATIONS //

    // progress bar aniamtion
    var count = 0;
    $('.js--wp-1').waypoint(function (direction) {
        console.log(direction);
        if (direction === "down" && count === 0) {
            $(".html").animate({
                width: "80%"
            }, 300, "linear");
            $(".css").animate({
                width: "80%"
            }, 300, "linear");
            $(".js").animate({
                width: "70%"
            }, 300, "linear");
            $(".node").animate({
                width: "50%"
            }, 300, "linear");
            count++;
        }
    }, {
        offset: "60%"
    });

    // fade aniamtions
    
    if ($(window).width() < 992) {
        $('.js--img-1').removeClass('js--wp-3');
        $('.js--img-2').removeClass('js--wp-4');
        $('.js--img-1').addClass('js--wp-5');
        $('.js--img-2').addClass('js--wp-5');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 992) {
            $('.js--img-2').removeClass('js--wp-4');
            $('.js--img-1').removeClass('js--wp-3');
            $('.js--img-1').addClass('js--wp-5');
            $('.js--img-2').addClass('js--wp-5');
        } else if ($(window).width() > 992) {
            $('.js--img-1').removeClass('js--wp-5');
            $('.js--img-2').removeClass('js--wp-5');
            $('.js--img-1').addClass('js--wp-3');
            $('.js--img-2').addClass('js--wp-4');
        }
    })
    
    $('.js--wp-2').waypoint(function (direction) {
        $('.js--wp-2').addClass("animated fadeIn")
    }, {
        offset: "70%"
    });

    $('.js--wp-3').waypoint(function (direction) {
        $('.js--wp-3').addClass("animated fadeInUp")
    }, {
        offset: "70%"
    });

    $('.js--wp-4').waypoint(function (direction) {
        $('.js--wp-4').addClass("animated fadeInLeft")
    }, {
        offset: "70%"
    });

    $('.js--wp-5').waypoint(function (direction) {
        $('.js--wp-5').addClass("animated fadeInRight")
    }, {
        offset: "60%"
    });
    
    $('.js--wp-6').waypoint(function (direction) {
        $('.js--wp-6').addClass("animated fadeInUp")
    }, {
        offset: "80%"
    });

})
