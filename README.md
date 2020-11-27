# imdb_movies

ABOUT
Web application that queries the imdb movie database. Users search by movie title in the search bar and results are displayed in a list. Results display the movie poster and movie overview. A dropdown button displays details on Actors, Director, and runtime. Users can click on a thumbs-up or thumbs-down button to save the movie to their dashboard.

TECH-STACK
This project was built in NodeJS with Express, Postgres, and ReactJS.

SETUP
This project is deployed at: https://hidden-citadel-33635.herokuapp.com

1. Install NPM
2. Run npm i -y
3. Install Postgres
4. create new Postgres database named: imdbdb
5. Create a .env file
6. Sign up for API keys at: https://www.themoviedb.org/ AND https://rapidapi.com/amrelrafie/api/movies-tvshows-data-imdb/endpoints
7. Save keys in .env file as API_SECRET_KEY = {rapidapi key here} AND tmb_API_KEY = {themoviedb key here}
8. npm run client
9. npm run seedDB
10. Once seedDB runs, terminate (Ctrl-C)
11. npm run start
12. in Browser: go to localhost:3000 to view web app.

HOW TO USE
1. Enter movie title in top SearchBar. Results will be displayed in a list.
2. Clicking dropdown button displays additional details.
3. Click thumbs-up / thumbs-down icon-buttons to save movie to user's dashboard. 
4. Pressing clear underneath search bar clears the search results list and displays the user dashboard
5. Clicking thumbs-up / thumbs-down icon on dashboard movie card will increase / decrease user rating of movie, respectively. 

DEVELOPER
Questions / comments? Seangreenebrandeis@gmail.com
github/Dev1nxavier 
