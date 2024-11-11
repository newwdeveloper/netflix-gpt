import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [signIn, setSignIn] = useState(true);

  const toggleSignIn = () => {
    setSignIn(!signIn);
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

      <form className="rounded-md py-5 absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 px-8 sm:px-16 border border-black bg-[rgba(255,255,255,0.8)] flex flex-col max-w-sm w-full">
        <h3 className="text-black text-3xl sm:text-4xl my-3">
          {signIn ? "Sign In" : "Sign up now"}
        </h3>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 my-1 w-full border border-black rounded-md"
          style={{ display: signIn ? "none" : "block" }}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 my-1 w-full border border-black rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-1 w-full border border-black rounded-md"
        />
        <button className="bg-red-600 text-white p-2 my-3 rounded-md">
          {signIn ? "Sign In" : "Sign up "}
        </button>
        <div
          className="flex gap-1 "
          style={{ display: signIn ? "flex" : "none" }}
        >
          <input type="checkbox" alt="checkbox" />
          <p className="text-slate-700">Remember Me</p>
        </div>
        <div className="flex mt-10 mb-5 gap-3">
          <p className="text-black">
            {signIn ? "new to Netflix" : "Already Registered? "}
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
