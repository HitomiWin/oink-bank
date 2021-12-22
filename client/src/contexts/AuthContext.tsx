import React, {
  VFC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  User,
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
  currentUser: User | null;
}

interface Props {
  children: ReactNode;
}
const AuthContext = createContext({ } as AuthContextProps);

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider: VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setEmail = (newEmail: string) => {
    if (currentUser) return updateEmail(currentUser, newEmail);
  };

  const setPassword = (newPassword: string) => {
    if (currentUser)
    return updatePassword(currentUser, newPassword);
  };

  const setDisplayName = (name: string) => {
    if (currentUser)
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
