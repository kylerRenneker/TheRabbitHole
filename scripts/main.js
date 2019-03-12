'use strict'

const baseURL = 'https://www.googleapis.com/youtube/v3/videos';
const videoURL = 'https://www.youtube.com/v/'
const apiKey = 'AIzaSyCtiVFVUXm6cOL5PjFl64liwXOOkTYG9FA'
const token = {
  nextPage: ''
}

const id = {
  newId: ''
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
    maxResults: '5',
    pageToken: token.nextPage
  }

  console.log(formatQueryParams(params));
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response.err)
      throw new Error(response.error.message);
    })
    .then(responseJson => {
      if(token.nextPage==='CMMBEAA'){
        token.nextPage = 'CAUQAQ';
      }
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
  if(responseJson.kind === 'youtube#searchListResponse'){
    id.newId = randomItem.id.videoId;
  }
  else {
    id.newId = randomItem.id;
  }
  renderVideoHtml();
}

function renderVideoHtml() {
  $('#video').html(`<embed id="video" src="${videoURL + id.newId}" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" title="Adobe Flash Player">`);
}

function loadNewVideo() {
  $('#dropdown').on('submit', function (event) {
    event.preventDefault();
      let category = $('#category-list').val();
      getNextVideoInfo(category);
  })
}

function onPageLoad() {
  loadNewVideo();
}

$(onPageLoad)