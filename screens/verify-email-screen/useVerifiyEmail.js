import { getAuth, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toastLib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContextProvider";
import {
  fb_reloadCurrentUser,
  fb_sendEmailVerification,
} from "../../services/firebase/queries/auth";

const useVerifyEmail = () => {
  const route = useRoute();
  const auth = getAuth();
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { getProfile } = useAuthContext();
  useEffect(() => {
    // sendVerificationLink();
  }, []);

  ///

  const verify = async () => {
    setButtonLoading(true);

    try {
      await fb_reloadCurrentUser();

      const verified = auth.currentUser.emailVerified;
      if (!verified) return showToast().error("", "Email is not Verified");

      await getProfile(auth.currentUser.uid);

      showToast().success("", "Email verified");
    } catch (error) {
      showToast().error("", error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  return {
    fb_sendEmailVerification,
    verify,
    isLoading,
    buttonLoading,
    email:
      auth.currentUser.email.split("@")[0].substring(0, 5) +
      "...@" +
      auth.currentUser.email.split("@")[1],
  };
};

export default useVerifyEmail;
