console.log('Our JS file is connected!');



window.fbAsyncInit = function() {
FB.init({
    appId      : '2079901702307820',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.2'
});
    
FB.AppEvents.logPageView();   

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    console.log(response);
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
statusChangeCallback(response);
console.log(response);
});