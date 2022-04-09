import { createContext, useState } from "react";
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userLogin = async (username, password) => {
    const { url, options } = TOKEN_POST({ username, password });
    const response = await (await fetch(url, options)).json();
    localStorage.setItem("token", response.token);

    setData(await getUser(response.token));
    setLogin(true);
  };

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await (await fetch(url, options)).json();
    return response;
  };

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
