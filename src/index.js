import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import { MainComponent } from './components';
import { SearchBar } from './components/searchBar';
import { DisplayResults } from './components/DisplayResults';
import { DetailCard } from './components/DetailMovieCard';
import { Container, makeStyles, Modal } from '@material-ui/core';
import { ListComponent } from "./components/ListComponent";

const App = () =>{

    const [results, setResults] = useState([]);
    const [selectMovie, setSelectMovie] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const useStyles = makeStyles((theme)=>({
        root: {
            width: '100vw',
            padding: '3em',
        },
    }))

    const classes = useStyles();

    //Load saved movies or search by title
    useEffect(()=>{
        try {
            
            //if no search term, load user saved movies
            if(!searchTerm.length){
                axios.get(`/api/saved-movies`)
                .then(res=>{
                    return res.data.movies;
                })
                .then(movies=>{
                    setResults(movies);
                })
                .catch(error=> {
                    throw new error;
                })
            }else{
                //else if entered search term, retrieve search results
                axios.get(`/api/search/${searchTerm}`)
                    .then(res=>{
                        return res.data.results;
                    })
                    .then(movies=>{
                        setResults(movies);
                    })
                    .catch(error=>{
                        throw new error;
                    })
            }

        } catch (error) {
            throw error;
        }
    }, [searchTerm]);

    return(
        <div className={classes.root}>
            <SearchBar
                setSearchTerm = {setSearchTerm}
                searchTerm = {searchTerm}/>
            {searchTerm.length? 
                <ListComponent
                    results = {results}/> :
                <DisplayResults
                    results = {results}/> }
        </div>
    )
}

ReactDom.render(<App/>, document.getElementById("app"));