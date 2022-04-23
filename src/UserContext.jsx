import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(!!window.localStorage.getItem("token")); // Evita que o usuário logado seja redirecionado para a página de login caso atualize a página
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setData(await getUser(token));
        setLogin(true);
        navigate("/conta");
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await (await fetch(url, options)).json();
    return response;
  };

  const userLogout = useCallback(() => {
    setLogin(false);
    setData(null);
    setLoading(false);
    setError(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (response.ok) {
            if (!data) {
              setData(await getUser(token));
              setLogin(true);
            }
          } else {
            const { message } = await response.json();
            throw new Error(`${message} (Token inválido)`);
          }
        } catch (error) {
          console.error(error);
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    };

    autoLogin();
  }, [userLogout, login, data]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
