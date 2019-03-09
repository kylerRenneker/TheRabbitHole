const searchURL = 'https://www.googleapis.com/youtube/v3/search';
const playURL = 'https://www.youtube.com/v/'
const Vid = {
    newVId: ''
}


function formatSearchParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function keywordSearch(keyword) {
    console.log(keyword);
    const params = {
        part: 'snippet',
        q: keyword,
        // chart: 'mostPopular',
        // regionCode: 'US',
        key: apiKey,
        maxResults: '1',
        type: 'video',
        pageToken: token.nextPage
    }

 
    const queryString = formatSearchParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.error.message);
        })
        // .then(responseJson => getNextPage(responseJson))
        .then(responseJson => {
            if(responseJson.nextPageToken !== undefined){
                token.nextPage = responseJson.nextPageToken;
                getRandomVId(responseJson)
            }
            if(responseJson.pageInfo.totalResults === 0){
                alert('Sorry there are no results for that search')
            }
            
        })
        .catch(err => {
            alert(`Something went wrong: ${err.message}`);
            $('#keywordSearch').val('');
            console.log('anything');  
        })
         
            
        
}

function getRandomVId(responseJson) {
    console.log(responseJson);
    let randomItem = responseJson.items[Math.floor(Math.random() * responseJson.items.length)];
    console.log(randomItem.id.videoId);
    Vid.newVId = randomItem.id.videoId;
    renderSearchHtml();
 
}



function renderSearchHtml() {
    $('#video').html(`<embed id="video" src="${playURL + Vid.newVId}" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" title="Adobe Flash Player">`);
}

function loadSearchVideo() {
    $('#searchbar').on('submit', function(event) {
        event.preventDefault();
        console.log('asdg');
        const keyword = $('#keywordSearch').val();
        console.log(keyword);
        keywordSearch(keyword);
    })
}
  
$(loadSearchVideo)