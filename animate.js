$(window).scroll(function(){
    if($(window).scrollTop() > 100) {
        $('.topHeader').addClass('sticky');
    }
    else if($('.navLinks').hasClass('open-nav')){
        $('.navLinks').removeClass('open-nav');
        $('.topHeader').removeClass('nav-on-click');
    }
    else {
        $('.topHeader').removeClass('sticky');
    }
})

$('.mobile-nav').on('click', function(){
    if($('.navLinks').hasClass('open-nav')){
        $('.navLinks').removeClass('open-nav')
        $('.topHeader').removeClass('nav-on-click');
    }
    else {
        $('.navLinks').addClass('open-nav');
        $('.topHeader').addClass('nav-on-click');
        $('.navLinks').addClass('mobile-nav-links');
        $('.navLinks li').addClass('mobile-li');
    }
})