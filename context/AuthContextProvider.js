import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingIndicator from "../components/LoadingIndicator";
import { firebaseAuth, db } from "../firebase/firebaseConfig";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { showToast } from "../utils/toastLib";
const AuthContext = createContext();
export const AUTH_STATES = {
  signedIn: "signed-in",
  isLoading: "isLoading",
  signedOut: "signedOut",
  profileSetup: "profileSetup",
  verifyEmail: "verifyEmail",
};
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    Bio: null,
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
        console.log(" usedjijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        getProfile(user.uid); // test if your profile exist if not navigate to setup profile
      } else {
        setCurrentAuthState(AUTH_STATES.signedOut);
      }
    });
  }, []);

  const getProfile = async (id) => {
    try {
      //
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setCurrentAuthState(AUTH_STATES.signedIn);
        console.log("Document data:", docSnap.data());
      } else {
        setCurrentAuthState(AUTH_STATES.profileSetup);
        console.log("No such document!");
      }
    } catch (error) {
      showToast().error("", error.message);
      console.log(error);
    }
  };

  if (currentAuthState == AUTH_STATES.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider value={{ currentAuthState, user, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentAuthState, user, getProfile } = useContext(AuthContext);
  return { currentAuthState, user, getProfile };
};

export default AuthContextProvider;
