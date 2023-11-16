import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer"
import SecondrayContainer from "./SecondradyContainer"
import GptSearch from "./GptSearch"
import usePopularMovies from "../hooks/usePopularMovies"
import { useSelector } from "react-redux"


const Browse = () =>{
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)
    useNowPlayingMovies()
    usePopularMovies()
    console.log("showGptSearch" ,showGptSearch)
    return(
        <div>
            <Header/>
            {
                showGptSearch ? 
                <GptSearch/> :
                <>
                 <MainContainer/>
                 <SecondrayContainer/>
                </>   
            }
          
            {/* {
                MainContainer
                - Videobackground
                - videoTitle

                SecondrayContainer     
                - MovieList
                - Cards
            } */}
        </div>
       
    )
}

export default Browse