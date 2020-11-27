import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { DisplayResults } from './DisplayResults';
import { makeStyles } from '@material-ui/core';
import { ListComponent } from './ListComponent';  
import { SearchBar } from './searchBar';
import { CardComponent } from './CardsComponent';

const MainComponent = ({results, setResults, setSelectMovie, setOpen, selectMovie}) =>{

    const tmb_API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=`;

    const tmb_API_KEY = `43c7d7b6fa2e6c9635028bd8740b0cb2`;

    //flex-box
    const useStyles = makeStyles((theme)=>({
        root: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'red',
        }
    }));

    const classes = useStyles();

    //async function for fetching data from API
    const getMovies = async ()=>{
        try {
            
           
            const {data:{movies}} = await axios.get(`/api/saved-movies`);
            console.log('retrieved user saved movies: ', movies);
            return await setResults(movies);

        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(()=>{

        // if(localStorage.getItem('movies')){
        //     const movies = JSON.parse(localStorage.getItem('movies'))
            

        //     console.log('loading movies from storage: ', movies);
        //     return setResults(movies);
        // }

        getMovies();

    }, [])

    return(
        <>
            <SearchBar
                setResults = {setResults}
            />
            <DisplayResults 
                results = {results}
                setResults = {setResults}
                />
            <ListComponent 
                results = {results}
                setSelectMovie = {setSelectMovie}
                setOpen = {setOpen}
            />
        </>
    );

}

export { MainComponent };

