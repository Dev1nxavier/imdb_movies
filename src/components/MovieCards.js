import React, {  } from 'react';
import { makeStyles, Card, CardContent, Typography, IconButton, CardMedia, Modal } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import axios from 'axios';

const MovieCards = ({movie, setSelectMovie, setOpen})=>{

    const tmb_API_KEY = ``;

    const useStyles = makeStyles((theme)=>({
        root: {
            width: 400,
            margin: '5em',
            display: 'grid',
            gridTemplateColumns: 'auto 151px'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        links: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    }))

    const classes = useStyles();


    const getDetailsSearch = async(id)=>{
        
        const detailsResult = await axios.get(`/api/movie-detail/${id}`)

        console.log('You clicked:',detailsResult.data.movieDetails);
        return await setSelectMovie(detailsResult.data.movieDetails);
    }


    const handleClick = (e)=>{
        console.log('You clicked this component: ', e.currentTarget.id);
        getDetailsSearch(e.currentTarget.id);

        //open DetailMovieCard as modal
        setOpen(true);
    }

            return(
                <Card className = {classes.root} id = {movie.id} onClick={handleClick}>
                    <div className = {classes.details}>
                        <CardContent className = {classes.content}>
                            <Typography component = "h5" variant = "h5">
                                {movie.title}
                            </Typography>
                        </CardContent>
                        <div className = {classes.links}>
                            <IconButton aria-label = "view dteails">
                                <PlayArrowIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <CardMedia className = {classes.cover}
                        image={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        title = "Movie Icon"/> 
                </Card>
            )
}

export { MovieCards };
