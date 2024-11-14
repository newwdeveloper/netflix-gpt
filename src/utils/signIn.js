import { useState } from "react";

export const useSignIn = () => {
  const [signIn, setSignIn] = useState(true);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };
  return { signIn, toggleSignIn };
};
