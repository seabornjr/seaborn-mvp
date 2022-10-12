
const { Client } = require('pg');
const express = require('express');
var cors = require('cors')
const config = require('./config.js')[process.env.NODE_ENV || "dev"]
const PORT = process.env.PORT;
console.log(PORT);
const client = new Client({
    connectionString: "postgres://artists_sql_user:O8ysXhzuZyky48XwZU077lnAfo0Xw7no@dpg-cd2tc702i3mvvgbp5hl0-a.oregon-postgres.render.com/artists_sql" + "?ssl=true"
})



const app = express();
client.connect();


app.use(express.json())
app.use(cors())
app.use('/', express.static('public'));


app.get('/', (req, res) => {
    client.query('SELECT * FROM artists')
    .then(result => {
        res.send(result.rows)
    })
})

app.get('/artists', (req, res) => {
    client.query('SELECT * FROM artists')
        .then(result => {
            res.send(result.rows)
        })
})

app.get('/artists/:id', (req, res) => {
    client.query('SELECT * FROM artists WHERE artist_id = ' + req.params.id)
        .then(result => {
            res.send(result.rows)
        })
})

app.post('/artists', (req, res) => {
    const { artist_name, artist_bio, artist_image, artist_url } = req.body;
    client.query('INSERT INTO artists (artist_name, artist_bio, artist_image, artist_url) VALUES ($1, $2, $3, $4)', [artist_name, artist_bio, artist_image, artist_url],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send('Artist Added')
        })
})

app.delete('/artists/:id', (req, res) => {
    client.query('DELETE FROM artists WHERE artist_id = '+ req.params.id + ';')
    .then(res.status(201).send('record deleted successfully'))
    .catch(function(error){console.log(error);});
})
app.listen(PORT, () => {
    console.log(`Our app is running on ${PORT}`)
});