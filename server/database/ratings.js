const { ErrorOutline } = require('@material-ui/icons');

const db = require('./database');
const ratingsRouter = require('express').Router();

//GET movie by id
const getMovieById= async(id) =>{
    try {
        const {rows: [movie]} = await db.query(`
        SELECT * FROM ratings
        WHERE omdb_id = $1;
        `, [id]);

        return movie;

    } catch (error) {
        console.error('Unable to retrieve movie');
        throw error;
    }
}

//UPDATE new movie rating
const updateSavedMovie = async(vote='thumbs_up', id)=>{
    console.log('Inside updateSavedMovie DB with vote: ', vote);

    try {
        const {rows: [movie]} = await db.query(`
        UPDATE ratings
        SET ${vote} = ${vote} + 1
        WHERE omdb_id = $1
        RETURNING *;
        `, [id]);

        return movie;

    } catch (error) {
        console.error('Unable to update movie entry');
        throw error;
    }

}

//INSERT user-rated movies in db
const saveUserMovies = async({title,imdb_id, omdb_id,thumbs_up, thumbs_down, imdb_rating = 0, poster_path, actors, director, summary, length}) =>{

    if(thumbs_up == true){
        thumbs_up = 1;
        thumbs_down = 0;
    }else{
        thumbs_up =0;
        thumbs_down = 1;
    }

    console.log('in ratings.js/saveUserMovies db with data: ',imdb_id, omdb_id, thumbs_up, thumbs_down, imdb_rating, poster_path, actors, director, summary, length);

    try {

        const {rows: [movie] } = await db.query(`
        INSERT INTO ratings("title","imdb_id", "omdb_id", "thumbs_up", "thumbs_down", "imdb_rating", "tmdb_poster_path", "actors", "director", "summary", "length")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;`, [title, imdb_id ,omdb_id, thumbs_up, thumbs_down, imdb_rating, poster_path, actors, director, summary, length]);

        console.log('Successfully saved new movie!');

        return movie;
    } catch (error) {
        console.error('Unable to insert new rating entry');
        throw error;
    }
}

//load saved user-rated movies from db
const getUserSavedMovies = async() =>{
    console.log('in ratings.js/loadSavedMovies');

    try {
        const {rows: movies} = await db.query(`
        SELECT * FROM ratings;`)
        console.log('Successfully retrieved movies, ', movies);
        return movies;

    } catch (error) {
        console.error("Unable to retrieve saved movies");
        throw error;
    }
}


module.exports = {saveUserMovies, getUserSavedMovies, getMovieById, updateSavedMovie};