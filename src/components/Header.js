import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { signOut ,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { addUser , removeUser } from "../utils/userSlice";
import {toggleGptSearch} from '../utils/gptSlice';
import {handleLang} from '../utils/configSlice';
import {auth} from '../utils/firebase';
import {LOGO ,SUPPORTED_LANGUAGE} from '../utils/constants'


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store)=> store.user)
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const selectedlang = useSelector(store => store.lang.selectedlang)
  console.log("selectedlang header" ,selectedlang)
  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
    })
    .catch((error) => {
      navigate("/error");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // Sign In
            const {email, uid , displayName , photoURL} = user
            dispatch(addUser({
                uid : uid,
                displayName : displayName,
                email : email,
                photoURL : photoURL
            }))
          navigate('/browse')
        } else {
            // Sign out
          dispatch(removeUser())
          navigate('/')
        }
      });
      // unsubscribe the onAuthStateChanged callback 
      return () => unsubscribe();
},[])

const handleSearchClick = () => {
   dispatch(toggleGptSearch())
}

const handlelangChange = (e) => {
    console.log('e' , e.target.value)
    dispatch(handleLang(e.target.value))
}
  return(
    <div className="flex justify-between absolute w-screen bg-gradient-to-b from-black z-10">
        <img className = "w-32" src = {LOGO}
         alt = "logo"/>
    {
      user && (
        <div className="flex p-2 mr-5">
          {showGptSearch && (
            <select className="mr-4 rounded-lg bg-red-800 text-white px-4 cursor-pointer"
            onChange={handlelangChange}
            >
             {
              SUPPORTED_LANGUAGE.map(lang => (
                <option key = {lang.identifier} value = {lang.identifier}>
                  {lang.name}
                </option>
              ))
             }
            </select>
          )} 
           <button className = "bg-red-800 text-white rounded-lg py-2 px-6" onClick={handleSearchClick}>
            {showGptSearch ? 'HomePage' : 'Gpt Search'}
          </button>
          <img className="w-10 h-10 ml-4" alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className= "text-white px-4">
            Sign Out
          </button> 
        </div>
      )
    }
    </div>
  )
}

export default Header