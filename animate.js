$(window).scroll(function(){
    if($(window).scrollTop() > 100) {
        $('.topHeader').addClass('sticky');
    }
    else {
        $('.topHeader').removeClass('sticky');
    }
})