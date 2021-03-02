import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import { Divider } from '@material-ui/core';

const SearchBar = ({results, setResults, setSearchTerm, searchTerm}) =>{

    const [searchTitle, setSearchTitle] = useState('');


    const useStyles = makeStyles((theme) => ({
        root: {
          padding: '2px 4px',
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
        },
        iconButton: {
          padding: 10,
        },
        divider: {
          height: 28,
          margin: 4,
        },
        resize:{
          fontSize: 50,
          color: 'blue',
        },
        enlargeLabel:{
          fontSize: 50,
        }
      }));

    const classes = useStyles();

    const tmb_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=`;



    const tmb_POST_URL = `http://image.tmdb.org/t/p/w154/`;


    const handleInput = (event)=>{
        const title = event.target.value;
        console.log('Searching movie title:', title);
        // setSearchTitle(title);
        setSearchTerm(title);
    }

    const clearField = (event)=>{
      //clears search field and resets search
      

      //clear search terms
      setSearchTerm('');
    }

    return (
    <Form>
      <TextField 
            id="standard-basic" 
            label="Search Movie Titles"
            value = {searchTerm} 
            InputProps = {{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              classes: {
                input: classes.enlargeLabel,
                label: classes.enlargeLabel,
              }
            }}
            className={classes.TextField}
            fullWidth
            onChange={handleInput}/>
            { searchTerm.length ? <IconButton color="secondary" aria-label="clear search field" onClick={clearField}>
              {"Clear"}
            </IconButton> : "" }
            
    </Form>
    
    )

}

export { SearchBar };
