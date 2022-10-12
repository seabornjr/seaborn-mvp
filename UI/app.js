



var ENV = 'production';

var resultsDiv = document.getElementById("results")
var dropdown = document.getElementById('artist-name'); 
let APIURL = ENV === 'dev' ? "http://localhost:8002" : 'https://artist-api.onrender.com'





function getArtist() {
    //reset divs and dropdown menu options
    resultsDiv.innerHTML = '';
    dropdown.innerHTML = '';
    var defaultValue = document.createElement('option');
    defaultValue.textContent = 'select artist';
    dropdown.append(defaultValue);
    console.log('look at us go')

    //get the data and build cards and the drop down list 
    fetch(APIURL)
    .then(res => res.json())
    .then(data => {
        data.map(artists => {
            console.log('it clicked')
            //artist div formatting
            var artistDiv = document.createElement('div')
                artistDiv.setAttribute('id','artistCard')
                console.log(artists)

                //add a new artist div to results
                resultsDiv.append(artistDiv)

                //add artist name to top of Div as header
                var artistName = document.createElement('h3')
                artistName.textContent = artists.artist_name;
                artistDiv.append(artistName);

                //add image of artist below name
                var image = document.createElement('img')
                image.setAttribute('src', artists.artist_image);
                artistDiv.append(image);

                //add artist bio as text content
                var bioDiv = document.createElement('div')
                bioDiv.textContent = artists.artist_bio;
                artistDiv.append(bioDiv);

                //create a button that when clicked links to artists spotify
                var spotifyButton = document.createElement('input');
                spotifyButton.setAttribute('type', "button");

                spotifyButton.setAttribute('value', 'Go to Spotify');
                artistDiv.append(spotifyButton);
                spotifyButton.setAttribute("onclick", `location.href='${artists.artist_url}';`);
                
                //create a dropdown item for each artist
                var artistListItem = document.createElement('option');
                artistListItem.setAttribute('value', artists.artist_id);
                artistListItem.textContent = artists.artist_name;
                dropdown.append(artistListItem);
                


            })
        })
    }
    
    function getArtistById(id) {
        resultsDiv.innerHTML = '';
        fetch(APIURL`/${id}`)
        .then(res => res.json())
        .then(data => {
            data.map(artists => {
                console.log('it clicked')
                //artist div formatting
                var artistDiv = document.createElement('div')
                    artistDiv.setAttribute('id','artistCard')
                    console.log(artists)

                    //add a new artist div to results
                    resultsDiv.append(artistDiv)

                    //add artist name to top of Div as header
                    var artistName = document.createElement('h3')
                    artistName.textContent = artists.artist_name;
                    artistDiv.append(artistName);

                    //add image of artist below name
                    var image = document.createElement('img')
                    image.setAttribute('src', artists.artist_image);
                    artistDiv.append(image);

                    //add artist bio as text content
                    var bioDiv = document.createElement('div')
                    bioDiv.textContent = artists.artist_bio;
                    artistDiv.append(bioDiv);

                    //create a button that when clicked links to artists spotify
                    var spotifyButton = document.createElement('input');
                    spotifyButton.setAttribute('type', "button");

                    spotifyButton.setAttribute('value', 'Go to Spotify');
                    artistDiv.append(spotifyButton);
                    spotifyButton.setAttribute("onclick", `location.href='${artists.artist_url}';`);
            })
        })
    }
    
    var button = document.getElementById('btn_submit');
    button.addEventListener('click', getArtist);
    
    
    //feature to search from wiki 
    var wikiurl = "https://en.wikipedia.org/w/api.php"; 
    var artistSearch = document.getElementById("artistSearch");
    var wikiSearch = document.getElementById("wikiSearch");
    var wikiParam = wikiSearch.value;

//feature to add new cards
var addButton = document.getElementById('addArtist');
artistSearch.addEventListener('click', () => {
       var body = {
        "artist_name": wikiSearch.value,
        "artist_bio": "test bio",
        "artist_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Harry_Styles_Wembley_June_2022_%28cropped%29.jpg/335px-Harry_Styles_Wembley_June_2022_%28cropped%29.jpg",
        "artist_url": "https://open.spotify.com/artist/6KImCVD70vtIoJWnq6nGn3"
    }
       fetch(APIURL + '/artists', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(getArtist);

    //     var form = document.createElement('form');
//     formField = document.getElementById('form');
//     formField.append(form);
//     form.innerHTML = `<select name="artist-names" id="search-results">
//    <option default value="">Select from Results</option>
//    `
})


//feature to delete a card
var deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
    let dropdown = document.getElementById('artist-name');
    fetch(APIURL + `/artists/${dropdown.value}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    })
        .then(getArtist);
})

/* artistSearch.addEventListener("click", () =>{
    
    
    var params = {
        action: "opensearch",
        search: wikiSearch.value,
        limit: "5",
        namespace: "0",
        format: "json"
    };


    wikiurl = wikiurl + "?origin=*";
    Object.keys(params).forEach(function(key){wikiurl += "&" + key + "=" + params[key];});
    console.log(wikiSearch.value);
fetch(wikiurl)
    .then(function(response){return response.json();})
    .then(function(response) {console.log(response);})
    .catch(function(error){console.log(error);});
}); */