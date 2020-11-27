import React, { useState } from 'react';
import { Avatar,Badge,Card,CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { ThumbDownSharp } from '@material-ui/icons';
import { ThumbUpSharp } from '@material-ui/icons';
import { blue } from 'chalk';

export const CardComponent = ({movie})=>{

    const [vote, setVote] = useState({thumbs_up: movie.thumbs_up, thumbs_down: movie.thumbs_down});

    const cardStyles = makeStyles(theme=>({
        root:{
            minWidth: 345,
            margin: '2em 2em',
        },
        media:{
            height: 0,
            paddingTop: '56.25%' //16:9 ratio
        },
        header:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'start'
        },
        avatar:{
            backgroundColor: blue[500],
        }
    }))

    const classes = cardStyles();

    //Increment vote
    const handleVote = (event)=>{
        console.log('You clicked: ', event.currentTarget.name);

        const voteType = event.currentTarget.name;

        axios.patch(`/api/saved-movies/${event.currentTarget.id}`, {voteType})
        .then(res =>{
            console.log('udpated vote. Response: ', res.data.movie);

            if(voteType==='thumbs_up'){
                setVote({...vote, thumbs_up: res.data.movie.thumbs_up});
            }else{
                setVote({...vote, thumbs_down: res.data.movie.thumbs_down});
            }
        })
    }

    console.log('Current vote state: ',vote);

    return (

        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="imdb rating" className={classes.avatar}>
              {movie.imdb_rating}
            </Avatar>
          }
          title={movie.title}
          subheader="Average User Rating"
        />
        <CardMedia
          className={classes.media}
          image={`http://image.tmdb.org/t/p/w500/${movie.tmdb_poster_path}`}
          title="Paella dish"
        />
        <CardContent>
            
        </CardContent>
        <CardActions disableSpacing>
            <div className={classes.iconButtonDiv}>
                <IconButton name="thumbs_up" id={movie.omdb_id} onClick={handleVote}>
                    <Badge badgeContent={vote.thumbs_up} color="primary">
                        <ThumbUpSharp fontSize="small"/>
                    </Badge>
                    
                </IconButton>
                <IconButton name="thumbs_down" id={movie.omdb_id} onClick = {handleVote}>
                    <Badge badgeContent={vote.thumbs_down} color="secondary">
                        <ThumbDownSharp fontSize="small"/>
                    </Badge>
                </IconButton>
            </div>
        </CardActions>
        </Card>
    )

}

//Display user saved movies as cards
const DisplayResults = ({results})=>{

    const useStyles = makeStyles(theme=>({
        root:{
            marginTop: theme.spacing(2),
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-around',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
        }
    }))

    const classes = useStyles();


    return (
        <div>
            <Typography variant = "h1" component = "h2">
                MY SAVED MOVIES
            </Typography>
            <div className= {classes.root}>
                {results.map((movie, index)=>{
                return <CardComponent 
                            movie = {movie}
                            key = {movie._id}
                            style={{margin:"2em"}}
                        />
            })}
            </div>
       </div>
    )
    
}

export { DisplayResults };