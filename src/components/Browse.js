import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer"
import SecondrayContainer from "./SecondradyContainer"
import usePopularMovies from "../hooks/usePopularMovies"


const Browse = () =>{
    useNowPlayingMovies()
    usePopularMovies()

    return(
        <div>
            <Header/>
            <MainContainer/>
            <SecondrayContainer/>
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