



var ENV = 'dev';

var resultsDiv = document.getElementById("results")
let APIURL = ENV === 'dev' ? "http://localhost:8002" : 'https://singer-backend-server.onrender.com/'





function getArtist() {
    resultsDiv.innerHTML = '';
    console.log('hmmm')
    fetch(`http://localhost:8002/artists`)
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

var addButton = document.getElementById('addArtist');
addButton.addEventListener('click', () => {
    var form = document.createElement('form');
    formField = document.getElementById('form');
    formField.append(form);
    form.innerHTML = `<select name="artist-names" id="search-results">
   <option default value="">Select from Results</option>
   `
    form.innerHTML = `<div class="topnav">
    <input type="text" placeholder="Search.."> <button type="add" id="artistSearch">Submit</button>
  </div>`
})
