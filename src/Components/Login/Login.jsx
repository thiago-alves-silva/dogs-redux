import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate.jsx";
import LoginForgotPassword from "./LoginForgotPassword";
import LoginResetPassword from "./LoginResetPassword";
import styles from "./Login.module.css";
import Loading from "../Helper/Loading";
import NotFound from "../NotFound";
import { useSelector } from "react-redux";

const Login = () => {
  const { token, user } = useSelector((state) => state);
  const loading = token.loading || user.loading;

  if (token.data) return <Navigate to="/conta" />;

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
