const db = require('./database');
const chalk = require('chalk');
const { saveUserMovies, loadUserSavedMovies } = require ('./ratings')
const axios = require('axios');

async function dropTables(){
    try {
        console.log('Dropping all tables...');

        const dropTables = await db.query(`
        DROP TABLE IF EXISTS ratings;`);

        console.log('Success!');
    } catch (error) {
        throw error;
    }
}

const createTables = async()=>{
    try {
        console.log('Building new tables...');

        await db.query(`
        CREATE TABLE IF NOT EXISTS ratings(
            _id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            imdb_id VARCHAR(255) UNIQUE,
            omdb_id INTEGER UNIQUE, 
            thumbs_up INTEGER DEFAULT 0,
            thumbs_down INTEGER DEFAULT 0,
            imdb_rating NUMERIC,
            tmdb_poster_path VARCHAR(255)
        );`);

        console.log('Success!');
    } catch (error) {
        console.error('Error creating tables!');
        throw error;
    };
}

async function startDB(){

    try {
        await dropTables()
        await createTables()
        db.end();


    } catch (error) {
        console.error('Error during startDB');
        throw error;
    }
};

startDB();


