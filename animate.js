$(window).scroll(function(){
    if($(window).scrollTop() > 100) {
        $('.top-header').addClass('sticky');
        $('.head-icon').addClass('animated rotateIn');
    }
    else if($('.nav-links').hasClass('open-nav')){
        $('.nav-links').removeClass('open-nav');
        $('.top-header').removeClass('nav-on-click');
        $('.mobile-nav').removeClass('rotate');
    }
    else {
        $('.top-header').removeClass('sticky');
        $('.head-icon').removeClass('animated rotateIn');
    }
})

$('.mobile-nav').on('click', function(){
    if($('.nav-links').hasClass('open-nav')){
        $('.nav-links').removeClass('open-nav')
        $('.mobile-nav').removeClass('rotate')
        $('.top-header').removeClass('nav-on-click');
    }
    else {
        $('.nav-links').addClass('open-nav');
        $('.top-header').addClass('nav-on-click');
        $('.mobile-nav').addClass('rotate')
        $('.nav-links').addClass('mobile-nav-links');
    }
})

$('.nav-link').click(function(){
    if($('.nav-links').hasClass('open-nav')){
        $('.nav-links').removeClass('open-nav');
        $('.top-header').removeClass('nav-on-click');
        $('.mobile-nav').removeClass('rotate');
    }
})

$("header").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top}, 'slow');
});