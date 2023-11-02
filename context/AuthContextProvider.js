import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingIndicator from "../components/LoadingIndicator";
import { auth } from "../firebaseConfig";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const AUTH_STATES = {
    signedIn: "signed-in",
    isLoading: "isLoading",
    signedOut: "signedOut",
  };

  const [user, setUser] = useState({});
  const [currentAuthState, setCurrentAuthState] = useState(
    AUTH_STATES.signedOut
  );

  console.log(auth);

  useEffect(() => {
    const test = async () => {
      auth.authStateReady().then((isReady) => {
        console.log(isReady);
      });
    };

    test();
  }, []);

  if (currentAuthState == AUTH_STATES.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider value={{ currentAuthState, user, AUTH_STATES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentAuthState, user, AUTH_STATES } = useContext(AuthContext);
  return { currentAuthState, user, AUTH_STATES };
};

export default AuthContextProvider;
