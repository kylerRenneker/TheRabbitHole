'use strict'

let url = 'https://www.googleapis.com/youtube/v3/search'
const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'


function playNext(videoId) {

}

function randomize(value) {
  console.log($('#category-list').val());
  let randomVid = 'oOPVBm0sA7Q';
  $('.js-randomize').on('click', function () {
    player.loadVideoById(randomVid);
    // player.videoId = 'RCXGpEmFbOw';
    console.log(player.videoId);
  })
   // console.log(value);
}

function loadKeywordSearch() {
//api endpoint search
/*options {
  q: ${#searchBar}.val(),
  part: 'snippet',
  maxResults: 50,
  key: 'apiKey'
}*/
}

function loadIframe() {

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
// console.log('created tag: ', tag);
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// console.log('first script tag: ', firstScriptTag);
// console.log('tag inserted above first script tag: ',tag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
  
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.stopVideo();
  console.log(player.getPlayerState());
}

// function onPlayerStateChange(event){
//   if (event.data === 5){
//     playNext();
//   }
// }



function loadDropdown() {
//api endpoint videoCategories
// let query = $(#dropdown).val());          //gotta fix
/*options {
  q: query,
  part: 'snippet',
  regionCode: 'US'
  key: 'apiKey'
}*/

$('#category-list').append($(`<option value="0">All videos</option>`));
}


function getCategories(){
  fetch('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + response.status);  
        return;  
      }
// Examine the text in the response  
      response.json()
      .then(data => {  
// console.log(data.items[1].id);
// console.log(data.items[1].snippet.title)
// console.log(data.items.length)
    
    	for (let i = 1; i < data.items.length; i++) {
      	let text = data.items[i].snippet.title;
      	let value = data.items[i].id;
        $('#category-list').append(`<option value=${value}>${text}</option>`)   
    	}    
      });  
    }  
  )  
.catch(err => {  
    console.error('Fetch Error -', err);  
});

let value = $('#category-list').val();
randomize(value);
}

function formSubmit(){
  $('#btn').on('click', function(){
    event.preventDefault();
    player.loadVideoById(randomVId);
      console.log(player.randomVId);
  })
}

function loadPage() {
  getCategories();
  formSubmit();
  loadIframe();
  loadDropdown();
  onYouTubeIframeAPIReady(); 
}



$(loadPage);