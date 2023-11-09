import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { signOut ,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { addUser , removeUser } from "../utils/userSlice";
import {auth} from '../utils/firebase';
import {LOGO} from '../utils/constants'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store)=> store.user)
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


  return(
    <div className="flex justify-between absolute w-screen bg-gradient-to-b from-black">
        <img className = "w-48" src = {LOGO}
         alt = "logo"/>
    {
      user && (
        <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )
    }
    </div>
  )
}

export default Header