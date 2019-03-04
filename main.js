'use strict'

const baseURL = 'https://www.googleapis.com/youtube/v3/videos'
const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'
const token = {
  nextPage: ''
}

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
    maxResults: '1',
    pageToken: token.nextPage
  }

  console.log(formatQueryParams(params));
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;

  console.log(url);

  fetch(url)
  .then (response => {
    if (response.ok){
      return response.json();
    }
    console.log(response.err)
    throw new Error (response.error.message);
})
  // .then(responseJson => getNextPage(responseJson))
  .then(responseJson => {
      token.nextPage = responseJson.nextPageToken;
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
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.stopVideo();
  console.log(player.getPlayerState());
}

function formSubmit(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let category = $('#category-list').val();
    getNextVideoInfo(category);
  })
}

function loadPage() {
  formSubmit();
  loadIframe();
}

$(loadPage);
