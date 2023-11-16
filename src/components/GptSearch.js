import {BG_URL} from '../utils/constants'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () =>{
    return(
        <div>
            <div className='absolute -z-1'>
                <img src = {BG_URL} alt = "bg-img"/>
            </div>
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
    )
}
export default GptSearch