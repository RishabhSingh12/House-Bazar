import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
  const [loggedIn, setIsloggedIn] = useState(false);
  const [checkState, setCheckState] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsloggedIn(true);
      }
      setCheckState(false);
    });
  }, []);

  return {
    loggedIn,
    checkState,
  };
};

export default useAuthState;
