import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingIndicator from "../components/LoadingIndicator";
import { firebaseAuth, db } from "../services/firebase/firebaseConfig";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { showToast } from "../utils/toastLib";
import { fb_getProfile } from "../services/firebase/functions/users_collection";
const AuthContext = createContext();

export const AUTH_STATES = {
  signedIn: "signed-in",
  isLoading: "isLoading",
  signedOut: "signedOut",
  profileSetup: "profileSetup",
  verifyEmail: "verifyEmail",
  error: "error",
};
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    bio: null,
    profileImage: null,
    id: null,
    username: null,
    timeStamp: null,
  });

  const [currentAuthState, setCurrentAuthState] = useState(
    AUTH_STATES.isLoading
  );

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.emailVerified) {
        getProfile(user.uid); // test if your profile exist if not navigate to setup profile
      } else {
        setCurrentAuthState(AUTH_STATES.signedOut);
      }
    });
  }, []);

  const getProfile = async (id) => {
    try {
      const docSnap = await fb_getProfile(id);
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setCurrentAuthState(AUTH_STATES.signedIn);
      } else {
        setCurrentAuthState(AUTH_STATES.profileSetup);
      }
    } catch (error) {
      setCurrentAuthState(AUTH_STATES.error);
      showToast().error("", error.message);
    }
  };

  if (currentAuthState == AUTH_STATES.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentAuthState,
        user,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentAuthState, user, getProfile } = useContext(AuthContext);
  return {
    currentAuthState,
    user,
    getProfile,
  };
};

export default AuthContextProvider;
