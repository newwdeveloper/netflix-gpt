import icon from "../utils/icons8-user-50.png";
import { useSignIn } from "../utils/signIn";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const { signIn } = useSignIn();
  console.log("Current SignIn State:", signIn);
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-black via-gray-900 to-black py-2 px-8 flex justify-between items-center z-50">
      {/* Logo */}
      <img
        className="w-32 h-auto"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />

      {user && (
        <div className="flex items-center gap-4">
          <img
            className="w-8 h-8 rounded-full"
            src={user.photoURL}
            alt="User Profile Icon"
          />
          <button
            onClick={handleSignout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
