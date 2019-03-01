'use strict'

const url = 'https://www.googleapis.com/youtube/v3/';

const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'

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


let randomVid = 'oOPVBm0sA7Q';

$('.js-randomize').on('click', function(){
  player.loadVideoById(randomVid);
    // player.videoId = 'RCXGpEmFbOw';
    console.log(player.videoId);
})



// Populate dropdown with list of categories
const dropdown = document.getElementById('category-list');
dropdown.length = 0;

const defaultOption = document.createElement('option');
defaultOption.text = 'All videos';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


//Not working
// const options = {
//     header: new HEADERS({
//         'X-Api-Key': apiKey}),
// };



fetch(url)  
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
        // console.log(data.items[1].id);
        // console.log(data.items[1].snippet.title)
        // console.log(data.items.length)
    
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




  






  /*
  When the user hits the randomize button, get the data from the selected dropdown value.
  Then we're going to want to get a random video based on the value selected by the user.
        This includes All random videos as well as the different categories. 
  
  
  
  */ 
