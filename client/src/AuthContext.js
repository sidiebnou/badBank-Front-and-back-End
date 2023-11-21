import { createContext, useContext, useEffect, useState } from "react";
import { auth, githubAuthProvider } from "./firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGitHub = () => {
    return signInWithPopup(auth, githubAuthProvider);
  };

  const value = {
    currentUser,
    signInWithGitHub,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
