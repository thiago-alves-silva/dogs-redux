import { useContext } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin } = useContext(UserContext);

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
        <Button>Entrar</Button>
      </form>
      <Link to="criar">Cadastro</Link>
    </div>
  );
};

export default LoginForm;
