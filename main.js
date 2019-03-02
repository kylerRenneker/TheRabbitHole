
const apiKey = 'AIzaSyCtiVFVUXm6cOL5PjFl64liwXOOkTYG9FA';
const rootURL = 'https://www.googleapis.com/youtube/v3/search';


// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
console.log('created tag: ', tag);
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log('first script tag: ', firstScriptTag);
console.log('tag inserted above first script tag: ',tag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady
      //'onStateChange': onPlayerStateChange
    }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.stopVideo();
}
  
// Populate dropdown with list of categories
const dropdown = document.getElementById('category-list');
dropdown.length = 0;

const defaultOption = document.createElement('option');
defaultOption.text = 'All videos';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

function getCategories(){
  fetch('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyCtiVFVUXm6cOL5PjFl64liwXOOkTYG9FA')  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }

        // Examine the text in the response  
        response.json().then(data => {  
          let option;
          for (let i = 0; i < data.items.length; i++) {
            option = document.createElement('option');
            option.text = data.items[i].snippet.title;
            option.value = data.items[i].id;
            dropdown.add(option);
        }    
        });  
      }
    )
    
    .catch(err => {  
      console.error('Fetch Error -', err);  
    });
}

function formSubmit(){
  $('#btn').on('click', function(){
    event.preventDefault();
    player.loadVideoById(randomVid);
      // player.videoId = 'RCXGpEmFbOw';
      console.log(player.videoId);
    })
}

function loadPage() {
  getCategories();
  formSubmit();
}

$(loadPage);



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