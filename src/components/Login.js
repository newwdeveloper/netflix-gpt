import { useRef, useState } from "react";
import { checkValidData } from "../utils/validation";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSignIn } from "../utils/signIn";
import { updateProfile } from "firebase/auth";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signIn, toggleSignIn } = useSignIn();

  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorPassMessage, setErrorPassMessage] = useState(null);
  const [errorNameMessage, setErrorNameMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Function to handle button click (submit)
  const handleButtonClick = () => {
    console.log("button clicked");

    // Capture input values
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

    // Validate input values
    const {
      name: nameError,
      email: emailError,
      password: passwordError,
    } = checkValidData(nameValue, emailValue, passwordValue);

    // Set error messages based on validation
    setErrorEmailMessage(emailError);
    setErrorPassMessage(passwordError);
    setErrorNameMessage(nameError);

    // If there's any validation error, stop the function
    if (emailError || passwordError) {
      return;
    }

    // Sign-up flow (if not in sign-in mode)
    if (!signIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(async (userCredential) => {
          const user = userCredential.user;

          try {
            const defaultPhotoURL = "https://via.placeholder.com/150";
            // Await updateProfile to ensure it completes
            await updateProfile(user, {
              displayName: nameValue,
              photoURL: defaultPhotoURL,
            });

            // Fetch updated user information from auth.currentUser
            const { uid, email, displayName, photoURL } = auth.currentUser;

            // Dispatch updated user information to Redux
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );

            // Navigate to the browse page after successful update
            navigate("/browse");
          } catch (error) {
            setErrorPassMessage(
              "Something went wrong while updating your profile."
            );
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorEmailMessage(`${errorCode} ${errorMessage}`);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(async (userCredential) => {
          const user = userCredential.user;

          try {
            // Reload user data to fetch the latest profile attributes
            await user.reload();

            // Fetch updated information
            const { uid, email, displayName, photoURL } = auth.currentUser;

            // Dispatch user information to Redux
            dispatch(
              addUser({
                uid,
                email,
                displayName: displayName || "No Name", // Fallback if null
                photoURL: photoURL || "https://via.placeholder.com/150", // Fallback if null
              })
            );

            // Navigate to the browse page
            navigate("/browse");
          } catch (error) {
            setErrorPassMessage("Error fetching user profile.");
          }
        })
        .catch((error) => {
          // Handle errors during sign-in
          setErrorPassMessage("User not found, Sign up");
        });
    }
  };

  const handleNameChange = () => {
    setErrorNameMessage(null); // Clear the error message when typing
  };
  // Handle email input change
  const handleEmailChange = () => {
    setErrorEmailMessage(null); // Clear the error message when typing
  };

  // Handle password input change
  const handlePasswordChange = () => {
    setErrorPassMessage(null); // Clear the error message when typing
  };

  const nameInputClass = errorNameMessage
    ? "border-red-500"
    : !errorNameMessage && name.current && name.current.value
    ? "border-green-500" // Green when valid
    : "border-gray-300"; // Default border color when there's no error or input

  const emailInputClass = errorEmailMessage
    ? "border-red-500"
    : !errorEmailMessage && email.current && email.current.value
    ? "border-green-500" // Green when valid
    : "border-gray-300"; // Default border color when there's no error or input

  const passwordInputClass = errorPassMessage
    ? "border-red-500"
    : !errorPassMessage && password.current && password.current.value
    ? "border-green-500" // Green when valid
    : "border-gray-300"; // Default border color when there's no error or input

  return (
    <div className="relative">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/61b94313-a53b-4a73-b973-7632aafc9d8f/web_collection/IN-en-20241104-TRIFECTA-61115c09-7325-4aae-8112-31ff36585e7e_large.jpg"
          alt="background img"
          className="w-full h-auto object-cover"
        />
      </div>

      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="rounded-md py-5 absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 px-8 sm:px-16 border border-black bg-[rgba(255,255,255,0.8)] flex flex-col max-w-sm w-full"
      >
        <h3 className="text-black text-3xl sm:text-4xl my-3">
          {signIn ? "Sign In" : "Sign up now"}
        </h3>
        <input
          ref={name}
          type="text"
          onChange={handleNameChange}
          placeholder="Enter your name(1st letter Capital)"
          className={`p-2 my-1 w-full border border-black rounded-md ${nameInputClass}`}
          style={{ display: signIn ? "none" : "block" }}
        />
        <p
          className="text-red-600 text-sm font-bold"
          style={{ display: signIn ? "none" : "block" }}
        >
          {errorNameMessage}
        </p>
        <input
          ref={email}
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          className={`p-2 my-1 w-full border border-black rounded-md ${emailInputClass}`}
        />
        <p className="text-red-600 text-sm font-bold">{errorEmailMessage}</p>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          className={`p-2 my-1 w-full border border-black rounded-md ${passwordInputClass}`}
        />
        <p className="text-red-600 text-sm font-bold">{errorPassMessage}</p>
        <button
          className="bg-red-600 text-white p-2 my-3 rounded-md"
          onClick={handleButtonClick}
        >
          {signIn ? "Sign In" : "Sign up "}
        </button>
        <div
          className="flex gap-1"
          style={{ display: signIn ? "flex" : "none" }}
        >
          <input type="checkbox" alt="checkbox" />
          <p className="text-slate-700">Remember Me</p>
        </div>
        <div className="flex mt-10 mb-5 gap-3">
          <p className="text-black">
            {signIn ? "new to Netflix?" : "Already Registered? "}
          </p>
          <p className="text-blue-800 cursor-pointer" onClick={toggleSignIn}>
            {signIn ? "Sign Up" : "Sign In "}
          </p>
        </div>
        <div>
          <p className="text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
          <Link to="/learnMore" className="text-blue-800">
            Learn More
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
