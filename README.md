
# The Rabbit Hole <a href="https://kylerrenneker.github.io/TheRabbitHole/">Live</a>
Find semi-random youtube videos either based on all available categories of youtube videos, from one of a select few categories, or a user input search term.
## Motivation
We wanted to randomize the youtube experience of the average user. If you don't have a specific idea as to what it is you want to watch, the random button can help. If you just want to watch popular music videos, there's a category for that. If you want to watch an obnoxious amount of youtube without having to actively look, we've solved that for you.

## Screenshot


## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery

## Features
Multiple sources from which to pull random video content from YouTube.

## Code Example
This is our function that randomizes the videos that are returned from the api call and rendered for the user.

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
## API Reference
We're using google's YouTube api. The reference documentaion for the endpoint used for the dropdown menu category based search can be found: <a href="https://developers.google.com/youtube/v3/docs/videos/list">Videos Endpoint</a>.


The documentation for the endpoint that is used for the user input search can be found here: <a href="https://developers.google.com/youtube/v3/docs/search/list">Search Endpoint</a>.

## How to use?
All a user needs to do is access the live-version of our site which can be found here: <a href="https://kylerrenneker.github.io/TheRabbitHole/">Live</a>, and utilize either the dropdown menu or the search bar to direct their search.

#### About Us
Kyler on
<a href="https://github.com/kylerRenneker">Github</a> 


Samantha on
<a href="https://github.com/Sam-Ilki">Github</a>



