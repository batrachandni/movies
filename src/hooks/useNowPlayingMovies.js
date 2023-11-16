import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addPlayingMovies} from '../utils/moviesSlice'
import { API_OPTIONS } from "../utils/constants";


const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();
    const nowPlayingMovie = useSelector(store => store.movies.nowPlayingMovies)
    const getNowPlayingMovies = async() => {
       const data =  await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
       const json = await data.json()
       dispatch(addPlayingMovies(json.results))
    }

    useEffect(()=>{
       !nowPlayingMovie && getNowPlayingMovies()
    } , [])

}

export default useNowPlayingMovies