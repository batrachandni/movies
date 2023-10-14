import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import Login from "./Login"
import Browse from "./Browse"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () =>{
    const dispatch = useDispatch()
    const appRouter = createBrowserRouter([
        {
            path : '/',
            element : <Login/>
        },
        {
            path : '/browse',
            element : <Browse/>
        }
    ])

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Sign In
                const {email, uid , displayName , photoURL} = user
                dispatch(addUser({
                    uid : uid,
                    displayName : displayName,
                    email : email,
                    photoURL : photoURL
                }))
              // ...
            } else {
                // Sign out
              dispatch(removeUser())
            }
          });
    },[])

    return(
        <div>
        <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body