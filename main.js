'use strict'

const baseURL ='https://www.googleapis.com/youtube/v3/videos';
const videoURL = 'https://www.youtube.com/v/'
const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'
const token = {
  nextPage: ''
}

const id = {
  newId:''
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
  console.log(randomItem.id);
  id.newId = randomItem.id;
  renderVideoHtml();
}

function onPageLoad(){
    loadNewVideo();
}
  
function renderVideoHtml(){
  $('#video').html(`<embed id="video" src="${videoURL + id.newId}" wmode="transparent" type="application/x-shockwave-flash" width="420" height="315" allowfullscreen="true" title="Adobe Flash Player">`);
}  


function loadNewVideo(){
  $('form').on('submit',function(event){
    event.preventDefault();
    let category = $('#category-list').val();
    getNextVideoInfo(category);
  })
}

$(onPageLoad)