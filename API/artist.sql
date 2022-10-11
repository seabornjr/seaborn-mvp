
DROP DATABASE IF EXISTS artistinfo;

CREATE DATABASE artistinfo;

DROP TABLE IF EXISTS artists;


CREATE TABLE artists (
    artist_id serial PRIMARY KEY,
    artist_name varchar(50) NOT NULL,
    artist_bio TEXT,
    artist_image TEXT,
    artist_url TEXT NOT NULL
);


