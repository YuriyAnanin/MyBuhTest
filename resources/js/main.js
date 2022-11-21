// MENU SCRIPTS

$(function () {
    var btn = $('.js_open_menu'),
        menu = $('.js_menu'),
        close_btn = $('.js_close_menu'),
        blackout = $('.page__blackout');    

    btn.click(function () { 
        menu.toggleClass('is-active');
        blackout.toggleClass('is-active');
    });

    close_btn.click(function () {
        menu.removeClass('is-active'); 
        blackout.removeClass('is-active');
    });

    blackout.click(function () {
        menu.removeClass('is-active');
        blackout.removeClass('is-active');
    });
});

$(function () {
    $('.input_phone').click(function () {
        if ($(window).width() < 550) {} else {
            $(this).setCursorPosition(5);
        }
    }).mask("+7 (799) 999 99 99"); 
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$('#notices_form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/form.php",
        type: "POST",
        data: $(this).serialize(),
        success: function (response) {
            $('.footer__success').addClass('success');
            setTimeout(function () {
                $('.footer__success').removeClass('success');
            }, 4000);
        },
        error: function (response) {
            $('.footer__success').addClass('success'); 
            setTimeout(function () {
                $('.footer__success').removeClass('success');
            }, 4000);
        }
    });
});

$('.js_index_title_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 400,
    arrows: false,
    dots: true,
    vertical: true,
    touchThreshold: 30,
    responsive: [{
        breakpoint: 855,
        settings: {
            slidesToShow: 1,
            vertical: false,
        }
    }]
});