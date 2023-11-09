import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondrayContainer = () => {
    // console.log("helloo")
    const movies = useSelector(store=> store.movies)
    console.log("movies" ,movies )
    return(  
        movies.nowPlayingMovies  && (
        <div className="bg-black">   
        <div className="-mt-52 pl-12 relative z-20">
            <MovieList title = {'Now Playing'} movies = {movies.nowPlayingMovies}/>
            <MovieList title = {'Trending'} movies = {movies.nowPlayingMovies}/>
            <MovieList title = {'Popular'} movies = {movies.popularMovies}/>
            <MovieList title = {'Horror'} movies = {movies.nowPlayingMovies}/>
        </div>
        </div>
        )       
    )
}

export default SecondrayContainer