// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
console.log('created tag: ', tag);
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log('first script tag: ', firstScriptTag);
console.log('tag inserted above first script tag: ',tag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady
      // 'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.stopVideo();
}


let randomVid = 'oOPVBm0sA7Q';

$('.js-randomize').on('click', function(){
    
  
  player.loadVideoById(randomVid);
    // player.videoId = 'RCXGpEmFbOw';
    console.log(player.videoId);
  })



// function randomId() {
//   const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
//   const strLength = 11;
//   let randomStr = '';
//   for (let i = 0; i<strLength; i++){
//     let rId = Math.floor(Math.random() * chars.length);
//     randomStr += chars.substring(rId, rId+1);
//   }
//   return randomStr;
// }

// console.log(randomId());