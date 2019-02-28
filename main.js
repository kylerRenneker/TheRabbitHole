'use strict'

const apiKey = 'AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM'


// Populate dropdown with list of categories
let dropdown = document.getElementById('category-list');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose a Category';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAhui6AUkhaT17er7V3Q1kwvmHV_kSdumM';

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