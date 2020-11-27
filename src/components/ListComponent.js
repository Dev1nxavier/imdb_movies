import React, { useState } from 'react';
import { Avatar, Table,TableBody,TableRow, TableCell, TableContainer, TableHead, Paper, makeStyles, Typography, IconButton, Collapse, Box, List, ListItem, ListItemAvatar, ListItemText, Link } from '@material-ui/core';
import axios from 'axios';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';

//Displays search results as list
const TableRowComponent = ({movie})=>{
    const [expand, setExpand] = useState(false);
    const [selectMovie, setSelectMovie] = useState([]);
    const [voteButton, setVoteButton] = useState({thumbs_up: true, thumbs_down: false});

    const useRowStyles= makeStyles(theme=>({
        iconLarge: {
            width: '92px',
            height: 'auto'
        },
        posterAlignCenter: 'alignCenter',
        leftAlign: 'alignLeft',
        iconButtonDiv:{
            display: 'flex',
            flexWrap: 'no-wrap'
        }
    }))

    const classes = useRowStyles();

    const handleClick = async(event) => {
        const id = event.currentTarget.id;
        console.log('You clicked me! ', event.currentTarget.id);
        //onclick retrieve item details
        await retrieveMovieDetails(id);
        
        //expand row
        setExpand(!expand);
    }

    const retrieveMovieDetails = async(id)=>{

        //only retrieve movie details if movieDetails !=this.id
        if(selectMovie.id!==id){
            const detailsResult = await axios.get(`/api/movie-detail/${id}`)
            const {data:{movieDetails}} = detailsResult; 
            
            //set selected movie
            setSelectMovie(movieDetails);
            return movieDetails;

        }else{
           return selectMovie;
        }
    }

    async function saveNewMovie(movie){
        try {
            console.log('Getting movie details: ', movie);

            //fetch call for saving new movie
            const saveMovie = await axios.post(`/api/save/${movie.id}`, {title: movie.title, id: movie.id ,imdb_id: movie.imdb_id, omdb_id: movie.id, thumbs_up: voteButton.thumbs_up, thumbs_down: voteButton.thumbs_down, imdb_rating: movie.vote_average, poster_path: movie.poster_path, actors: movie.actors, director: movie.director, summary: movie.overview, length: movie.runtime})

            console.log('savedMovie?', saveMovie);

        } catch (error) {
            console.error('Unable to save movie');
            throw error;
        }
    }


    //Register user thumbs up/down
    const handleVote = async(event)=>{
        
        event.preventDefault();
        console.log('event.target.name:',event.currentTarget.name, event.currentTarget.id);

        const button = event.currentTarget.name;
        console.log(button);

            //set thumbs_up or thumbs_down
            if(button === 'thumbs_up'){
                setVoteButton({...voteButton, thumbs_up: true, thumbs_down: false})
            }else{
                setVoteButton({...voteButton, thumbs_down: true, thumbs_up: false});
            }

        try {
            
            //retrieve movie details for selected...
                retrieveMovieDetails(event.currentTarget.id)
                .then(saveNewMovie)
                .catch(error=>{
                    throw error;
                })

        } catch (error) {
            console.error('Unable to save movie');
            throw error;
        }
        
    }

    return(
        <React.Fragment>
            <TableRow hover >
            <TableCell className={classes.posterAlignCenter} align="center" component = "th" scope="row">
                            <Avatar className={classes.iconLarge} variant = "square" src = {`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>
                        </TableCell>
                <TableCell className={classes.leftAlign} align="left">
                            <Typography variant="h6" component="div" color="textSecondary">
                                {movie.title}
                            </Typography>
                            <Typography variant="subtitle2" component="div" color="textPrimary">
                                {movie.overview}
                            </Typography>
                </TableCell>
                <TableCell>
                    <div className={classes.iconButtonDiv}>
                        <IconButton name="thumbs_up" id={movie.id} onClick={handleVote}>
                            <ThumbUpSharpIcon fontSize="small"/>
                        </IconButton>
                        <IconButton name="thumbs_down" id={movie.id} onClick = {handleVote}>
                            <ThumbDownSharpIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <IconButton aria-label="expand row" size="small" id={movie.id} onClick={handleClick}>
                        {expand? <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in = {expand} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                MOVIE FACTS
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Actors" secondary={selectMovie.actors}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Director" secondary={selectMovie.director}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Runtime" secondary={`${selectMovie.runtime} mins`}/>
                                </ListItem>
                            </List>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    );
}


const ListComponent = (props)=>{

const {results, setOpen, setSelectMovie, selectMovie } = props;

//state for saving selected movie row
const [selected, setSelected] = useState([]);

//state for expanding row detail
const [expand, setExpand] = useState(false);

const useStyles = makeStyles((theme)=>({
    tableCell:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        justifyContent: 'center',
        title:{
            fontSize: '3em',
            marginLeft: '1em',
        } 
    },
    iconLarge: {
        width: '92px',
        height: 'auto'
    }
}))

const classes = useStyles();



return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>

            </TableHead>
            <TableBody>
                {results.map(movie=>(
                    <TableRowComponent key={movie.id} movie={movie} id={movie.id}/>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

}

export { ListComponent, TableRowComponent };
