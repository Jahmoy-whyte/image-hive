import { getAuth, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toastLib";
import { useNavigation, useRoute } from "@react-navigation/native";

const useVerifyEmail = () => {
  const route = useRoute();
  const auth = getAuth();
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    // sendVerificationLink();
  }, []);

  const sendVerificationLink = () => {
    setIsLoading(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        showToast().info("", "Link sent");
      })
      .catch((error) => {
        showToast().error("", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  ///

  const verify = async () => {
    setButtonLoading(true);

    try {
      await auth.currentUser.reload();

      const verified = auth.currentUser.emailVerified;
      if (!verified) return showToast().error("", "Email is not Verified");

      if (route.params.navigateTo === "login") {
        nav.navigate("login");
        showToast().success("", "Email verified you can now login");
      } else {
        nav.navigate("home");
      }
    } catch (error) {
      showToast().error("", error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  return {
    sendVerificationLink,
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
