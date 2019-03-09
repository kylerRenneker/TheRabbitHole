const searchURL = 'https://www.googleapis.com/youtube/v3/search';

function keywordSearch(keyword) {
    console.log(keyword);
    const params = {
        part: 'snippet',
        q: keyword,
        key: apiKey,
        maxResults: '1',
        type: 'video',
        pageToken: token.nextPage
    }

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.error.message);
        })
        .then(responseJson => {
            if(responseJson.nextPageToken !== undefined){
                token.nextPage = responseJson.nextPageToken;
                getRandomId(responseJson)
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