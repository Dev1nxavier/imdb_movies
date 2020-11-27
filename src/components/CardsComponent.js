import React, {  } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, makeStyles, Typography, IconButton } from '@material-ui/core';
import ThumbUpSharp from '@material-ui/icons/ThumbUp';
import ThumbDownSharp from '@material-ui/icons/ThumbDown';
import axios from 'axios';

const CardComponent = (props)=>{

    const {results} = props;

    const cardStyles = makeStyles(theme=>({
        root:{
            maxWidth: 345,
        },
        media:{
            height: 140,
        },
    }));

    const classes = cardStyles();

    const handleVote = async(event, name) =>{
        event.preventDefault();

        console.log('event value:', event.currentTarget.value);
        const thumbs_up = true;
        const movie = event.target.movie;
        
        try {
            //onClick for saving movie entry with vote to db
            const saveMovie = await axios.post(`/api/save`, {id: movie.id ,imdb_id: `${movie.id}`, omdb_id: movie.id, thumbs_up, imdb_rating: movie.vote_average})

            console.log('savedMovie?', saveMovie);
        } catch (error) {
            console.error('Unable to save movie');
            throw error;
        }
    }

    return (
        <div>
            {results.map(movie=>(
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image = {`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <IconButton onClick = {handleVote} movie={movie} value = {"thumbs_up"}>
                                    <ThumbUpSharp/>
                            </IconButton>
                            <IconButton onClick = {handleVote} value = {"thumbs_down"}>
                                    <ThumbDownSharp/>
                            </IconButton>
                        </CardActions>
                    </Card>
                )) 
                
            }
        </div>
    )
}

export { CardComponent};