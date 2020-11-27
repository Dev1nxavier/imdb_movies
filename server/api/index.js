const apiRouter = require('express').Router();
const process = require('process');
const axios = require ('axios');
const { 
    getUserSavedMovies,
    saveUserMovies,
    getMovieById,
    updateSavedMovie
    } = require('../database');

const API_SECRET_KEY = process.env.API_SECRET_KEY;
tmb_API_KEY = process.env.tmb_API_KEY;
const omdb_API_KEY = process.env.API_SECRET_KEY;
const tmb_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=`;

apiRouter.get('/', async(req, res, next)=>{
    res.send({
        message: 'Inside apiRouter GET / route',
        status: true
    })
    next();
})

//Check if server is running...
apiRouter.use('/health',async(req, res, next)=>{
    res.send({message: 'Server is healthy...'});
});

//get all user-saved movies
apiRouter.get('/saved-movies', async(req, res, next)=>{

    try {
        const movies = await getUserSavedMovies();

        if(movies){
            res.send({
                message: 'successfully retrieved user saved movies',
                status: true,
                movies
            })
        }else{
            next({
                error: 'FailedToRetrieveSavedMoviesError',
                message: 'Unable to retrieve saved movies'
            })
        }
    } catch ({error, message}) {
        console.error({error, message});
        throw error;
    }
   
    
})

//getSavedMovie
apiRouter.get('/saved-movies/:movieId', async(req, res, next)=>{

    const movieId = req.params.movieId;

    console.log('inside apiRouter.GET /saved-movies/:movieId. Retrieving movie...', movieId);

    try {
        const movie = await getMovieById(movieId);

        res.send({
            message: 'Successfully retrieved movie by id',
            status: true,
            movie
        })
    } catch (error) {
        throw error;
    }
})

//update savedMovie
apiRouter.patch('/saved-movies/:movieId', async(req, res, next)=>{
    const movieId = req.params.movieId;
    console.log('@ apiRouter /saved-movies/movieID with params: ', req.body);
    const {voteType} = req.body;
    try {
        const movie = await updateSavedMovie(voteType, movieId);

        res.send({
            message: 'Successfully updated rating',
            status: true,
            movie
        })
    } catch (error) {
        throw error;
    }
})

//save new movie to db
apiRouter.post('/save/:movieId', async(req, res, next)=>{

    const movieId = req.params.movieId;

    console.log('inside apiRouter.POST /save-movie. Saving movie...', req.body);
    try {

        //attempt to get movie primary key
        const key = await getMovieById(movieId);

        //if there is a key, update the vote count
        if(key){
            console.log('Already in DB, updating votes...', key)
            let vote='';
            if(req.body.thumbs_up==true){
                vote = 'thumbs_up';
            }else{
                vote = 'thumbs_down';
            }

            const updateMovie = await updateSavedMovie(vote, movieId);
            res.send({
                message: 'Successfully updated movie',
                status: true,
                updateMovie
            })
        }else{
            //if no key, create new table entry
            console.log('No entry found. Creating new entry...');
            const saveMovie = await saveUserMovies(req.body);

            res.send({
                message: 'Successfully saved new movie',
                status: true,
                saveMovie
            })
        }
        
    } catch (error) {
        throw error;
    }
})

//getMovieDetail
apiRouter.get('/movie-detail/:movieId', async(req, res, next)=>{
    
    const movieId = req.params.movieId;
    console.log('Inside API GET /movie-details, params: ', movieId);

    try {
        //retrieve movie details from IMDB API
        let movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmb_API_KEY}`);

        movieDetails = movieDetails.data;

        //retrieve director and actors from omdbapi
        let castCrew = await axios.get(`http://www.omdbapi.com/?apikey=${API_SECRET_KEY}&i=${movieDetails.imdb_id}`);

        castCrew = castCrew.data;

        movieDetails['director'] = castCrew.Director;
        movieDetails['actors'] = castCrew.Actors;

        res.send({
            movieDetails,
            status: true,
            message: 'Successfully retrieved movie details'
        })
    } catch (error) {
        console.error('Unable to retrieve movie details');
        throw error;
    }

    
})

//Search movie by title
apiRouter.get(`/search/:title`, async(req, res, next)=>{
    try {
        const title = req.params.title;

        const params = {
            title,
            type: 'get-movies-by-title'
        }

        const {data:{results}} = await(axios.get(`${tmb_API_URL}${tmb_API_KEY}&query=${title}`));
        console.log('Search results: ', results);
        
        res.send({
            message: 'Successfully retrieved movies',
            status: true,
            results
        })
    } catch (error) {
        console.error('Unable to find movies with that title');
        throw error;
    }
})


module.exports = apiRouter;