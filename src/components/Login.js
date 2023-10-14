import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value , password.current.value)
    setErrorMessage(message);
    if(message) return;
    if(!isSignInForm){
      // Sign Up form
      
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("user Sign up" , user)
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
    })
    .then(()=>{
      console.log("inside then")
      navigate('/browse')
    })
    .catch(()=>{
      setErrorMessage(message)
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + '-' + errorMessage)
  
  });
    }else {
      //Sign In form
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user Sign In" , user);
        navigate('/browse')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + '-' + errorMessage)
      });
    }

  };

  return (
    <div>
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
       onSubmit={(e)=>e.preventDefault()}
        className="absolute bg-black w-4/12 mx-auto left-0 right-0 rounded-lg text-white 
      bg-opacity-80 p-12 top-32"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign UP"}
        </h1>
        {!isSignInForm && (
          <input
            className="w-full my-4 p-4 bg-gray-700"
            ref={name}
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          className="w-full my-4 p-4 bg-gray-700"
          type="text"
          placeholder="Email Address"
          ref={email}
        />
        <input
          className="w-full my-4 p-4 bg-gray-700"
          type="Password"
          placeholder="Password"
          ref={password}
        />
        <button
          className="w-full bg-red-600 rounded-lg p-4 my-6"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign UP"}
        </button>
        <p className="text-red-500 font-bold">{errorMessage}</p>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
