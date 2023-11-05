import { useAuthContext } from "../../context/AuthContextProvider";

const useHome = () => {
  const { user } = useAuthContext();

  return { user };
};

export default useHome;
