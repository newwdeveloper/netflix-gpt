import { useRef, useState } from "react";
import { checkValidData } from "../utils/validation";
import Header from "./Header";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSignIn } from "../utils/signIn";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_URL } from "../utils/constant";

function Login() {
  const dispatch = useDispatch();

  const { signIn, toggleSignIn } = useSignIn();

  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorPassMessage, setErrorPassMessage] = useState(null);
  const [errorNameMessage, setErrorNameMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

    const {
      name: nameError,
      email: emailError,
      password: passwordError,
    } = checkValidData(nameValue, emailValue, passwordValue);

    setErrorEmailMessage(emailError);
    setErrorPassMessage(passwordError);
    setErrorNameMessage(nameError);

    if (emailError || passwordError) {
      return;
    }

    if (!signIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              console.log(addUser);
            })
            .catch((error) => {
              setErrorPassMessage("err");
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorPassMessage(errorCode + "" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorPassMessage(errorCode + "" + errorMessage);
        });
    }
  };

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
          onChange={() => setErrorNameMessage(null)}
          placeholder="Enter your name(1st letter Capital)"
          className={`p-2 my-1 w-full border border-black rounded-md ${
            errorNameMessage ? "border-red-500" : "border-gray-300"
          }`}
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
          onChange={() => setErrorEmailMessage(null)}
          className={`p-2 my-1 w-full border border-black rounded-md ${
            errorEmailMessage ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-red-600 text-sm font-bold">{errorEmailMessage}</p>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          onChange={() => setErrorPassMessage(null)}
          className={`p-2 my-1 w-full border border-black rounded-md ${
            errorPassMessage ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-red-600 text-sm font-bold">{errorPassMessage}</p>
        <button
          className="bg-red-600 text-white p-2 my-3 rounded-md"
          onClick={handleButtonClick}
        >
          {signIn ? "Sign In" : "Sign up"}
        </button>
        <div
          className="flex gap-1"
          style={{ display: signIn ? "flex" : "none" }}
        >
          <input type="checkbox" />
          <p className="text-slate-700">Remember Me</p>
        </div>
        <div className="flex mt-10 mb-5 gap-3">
          <p className="text-black">
            {signIn ? "new to Netflix?" : "Already Registered? "}
          </p>
          <p className="text-blue-800 cursor-pointer" onClick={toggleSignIn}>
            {signIn ? "Sign Up" : "Sign In"}
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
