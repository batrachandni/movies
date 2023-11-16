import { useDispatch, useSelector } from "react-redux"
import openai from "../utils/openai";
import lang from '../utils/langConstants'
import {API_OPTIONS} from '../utils/constants'
import {addGptMovieResult} from '../utils/gptSlice'
import { useRef } from "react"

const GptSearchBar = () => {
    const selectedlang = useSelector(store => store.lang.selectedlang)
    const dispatch = useDispatch()
    console.log("selectedLang searchbar" ,selectedlang)
    console.log("lang[selectedlang]" ,lang[selectedlang])
    const searchText = useRef(null)

    const tmdbMovieSearch = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="
        +movie+
        "&include_adult=false&language=en-US&page=1", API_OPTIONS)
        const json = await data.json()
        console.log("json" ,json)
        return json.results;
    }

    const handleGptSearch = async() => {
        console.log(searchText.current.value)

        const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        // make an API call for fetching the data 
        const gptResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });

          if(!gptResult) return null
        //   console.log(gptResult.choices?.[0]?.message?.content);
          const gptMOvies = gptResult.choices?.[0]?.message?.content.split(",")
          // search these movies in tmdb database
          const promiseArray = gptMOvies.map(movie => tmdbMovieSearch(movie))
        // when we call the API in map it will return a arry of promise
          const tmdbResult = await Promise.all(promiseArray)
          dispatch(addGptMovieResult({movieResults :tmdbResult , movieNames : gptMOvies}))
          console.log("tmdbResult" ,tmdbResult)
    }

    return(
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 grid grid-cols-12"
            onSubmit={(e)=> e.preventDefault()}>
                <input
                 ref = {searchText}
                 type = "text"
                 placeholder={lang[selectedlang].gptSearchPlaceholder}
                 className= "col-span-9 p-4"
                />
                <button className="col-span-3 py-2 bg-red-800 text-white px-4"
                    onClick={handleGptSearch}
                >{lang[selectedlang].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar