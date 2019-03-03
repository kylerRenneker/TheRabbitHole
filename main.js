'use strict'

const baseURL = 'https://www.googleapis.com/youtube/v3/videos'
const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getNextVideoInfo(category) {
  const params = {
    part: 'snippet',
    videoCategoryId: category,
    chart: 'mostPopular',
    regionCode: 'US',
    key: apiKey,
    maxResults: '50',
    pageToken: 'CDIGAA'
  }

  console.log(formatQueryParams(params));
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;

  console.log(url);

  fetch(url)
  .then (response => {response.ok
    if (response.ok){
      return response.json();
    }
    throw new Error (response.statusText);
})
  // .then(responseJson => getNextPage(responseJson))
  .then(responseJson => {
      params.pageToken = responseJson.nextPageToken;
      console.log(params.pageToken);
      getRandomId(responseJson)
    })
  .catch(err => {
    alert(`Something went wrong: ${err.message}`);
  })
}

function getRandomId(responseJson) {
  console.log(responseJson);
  let randomItem = responseJson.items[Math.floor(Math.random() * responseJson.items.length)];
  console.log(randomItem);
  playNext(randomItem);
  console.log(responseJson.nextPageToken)
}

function playNext(randomVideo) {
  player.loadVideoById(randomVideo.id);
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

function getCategories(){ //remove or hide 30-44
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
    getNextVideoInfo(category);
  })
}

function loadPage() {
  getCategories();
  formSubmit();
  loadIframe();
  loadDropdown();
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