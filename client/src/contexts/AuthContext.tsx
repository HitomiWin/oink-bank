import React, {
  VFC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from 'firebase/compat/app';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/index";

interface AuthContextProps {
  currentUser: firebase.User | null ;
}


interface Props {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextProps>({ currentUser: null });

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider: VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null >(
   null
  );
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email:string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setEmail = (newEmail) => {
    return updateEmail(currentUser, newEmail);
  };

  const setPassword = (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  const setDisplayName = (name:String) => {
    return updateProfile(currentUser, {
      displayName: name,
    });
  };

  // add auth-state-observer here (somehow... 😈)
  useEffect(() => {
    // listen for auth-state changes
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const contextValues = {
    // here be everything the children needs/should be able to use
    currentUser,
    loading,
    login,
    logout,
    signup,
    resetPassword,
    setDisplayName,
    setEmail,
    setPassword,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && <p>Loading...</p>}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
