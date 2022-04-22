import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate.jsx";
import LoginForgotPassword from "./LoginForgotPassword";
import LoginResetPassword from "./LoginResetPassword";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";
import Loading from "../Helper/Loading";
import NotFound from "../NotFound";

const Login = () => {
  const { login, loading } = useContext(UserContext);

  if (login) return <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="perdeu" element={<LoginForgotPassword />} />
            <Route path="resetar" element={<LoginResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </section>
  );
};

export default Login;
