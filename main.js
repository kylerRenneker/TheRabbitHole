'use strict'

const baseURL = 'https://www.googleapis.com/youtube/v3/search'
const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function playNext(category) {
  const params = {
    key: apiKey,
    part: 'snippet',
    videoCategoryId: category,
    chart: 'mostPopular'
  }

  console.log(formatQueryParams(params));
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;
}

function randomize(value) {
  console.log($('#category-list').val());
  let randomVid = 'oOPVBm0sA7Q';
  $('.js-randomize').on('click', function () {
    player.loadVideoById(randomVid);
    console.log(player.videoId);
  })
}

function loadIframe() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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

function loadDropdown() {
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
}

function formSubmit(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let category = $('#category-list').val();
    playNext(category);
  })
}

function loadPage() {
  getCategories();
  formSubmit();
  loadIframe();
  loadDropdown();
  // onYouTubeIframeAPIReady(); 
}

$(loadPage);