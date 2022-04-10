import { useContext } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="/" onSubmit={handleSubmit}>
        <Input label="Usuário" autoComplete="username" {...username} />
        <Input
          type="password"
          label="Senha"
          autoComplete="username"
          {...password}
        />
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && (
          <p
            className={styles.error}
            dangerouslySetInnerHTML={{ __html: error }}
          ></p>
        )}
      </form>
      <Link to="criar">Cadastro</Link>
    </div>
  );
};

export default LoginForm;
