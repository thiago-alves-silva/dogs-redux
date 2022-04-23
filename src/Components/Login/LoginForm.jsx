import { useContext } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import btnStyles from "../Forms/Button.module.css";
import Head from "../Helper/Head";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <div className="anime-left">
      <Head title="Login" description="Página de login da rede social Dogs" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link to="criar" className={btnStyles.button}>
          Cadastro
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
