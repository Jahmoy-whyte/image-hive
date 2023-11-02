import { createContext, useState } from "react";

const userInfoContext = createContext(null);
const userInfoProvider = () => {
  const [user, setUser] = useState();
};

export default userInfoProvider;
