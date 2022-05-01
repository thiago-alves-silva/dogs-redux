import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import btnStyles from "../Forms/Button.module.css";
import Head from "../Helper/Head";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { token, user } = useSelector((state) => state);
  const loading = token.loading || user.loading;
  const error = token.error || user.error;
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      const user = { username: username.value, password: password.value };
      await dispatch(userLogin(user));
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
