import React, {  } from 'react';
import { CardActions, makeStyles, Typography, Card, CardHeader, Avatar, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { ThumbUpSharp } from '@material-ui/icons';
import {ThumbDownSharp} from '@material-ui/icons';
import Axios from 'axios';


const DetailCard = ({selectMovie})=>{

    const useStyles = makeStyles((theme)=>({
        root: {
            width: 600,
            position: 'absolute',
            left: '25%',
            top: '10%',
        },
        media:{
            height: 0,
            paddingTop: '56.25%' //16:9 ratio
        },
        pos:{
            marginBottom: 12,
        },
        header:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    
        
    }))

    const classes = useStyles();

    //Register user thumbs up/down
    const handleVote = async(event, name)=>{
        event.preventDefault();

        console.log('event.target.value:',event.currentTarget.value);

        try {
            //onClick for saving movie entry with vote to db
            const saveMovie = await Axios.post(`/api/save`, {id: selectMovie.id ,imdb_id: `${selectMovie.imdb_id}`, omdb_id: selectMovie.id, thumbs_up:true, imdb_rating: selectMovie.vote_average})

            console.log('savedMovie?', saveMovie);
        } catch (error) {
            console.error('Unable to save movie');
            throw error;
        }
        
    }


    return(
        <Card className = {classes.root} value = { selectMovie.id}>
            <div className={classes.header}>
            <CardHeader
                avatar = {
                    <Avatar aria-label="voting average">
                        {selectMovie.vote_average}
                    </Avatar>
                }
                title={selectMovie.original_title}
            />
            <div>
            <IconButton>
                        <ThumbUpSharp/>
                </IconButton>
                <IconButton onClick = {handleVote} value = {"thumbs_down"}>
                        <ThumbDownSharp/>
                </IconButton>
            </div>  
            </div>
            <CardMedia
                className = {classes.media}
                image={`http://image.tmdb.org/t/p/w500/${selectMovie.poster_path}`}
            />
            <CardContent>
                <Typography variant = "body2" color="textSecondary" component="p">
                    {selectMovie.overview}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant = "h5" component="h2">
                    Director: {selectMovie.director} Release Date: {selectMovie.release_date} Actors: {selectMovie.actors}
                </Typography>
            </CardActions>
        </Card>
    )
}

export { DetailCard };