import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //if user signin or signup
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-black via-gray-900 to-black py-2 px-8 flex justify-between items-center z-50">
      {/* Logo */}
      <img className="w-32 h-auto" src={LOGO} alt="Netflix Logo" />

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
