import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      const response = await (
        await fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        })
      ).json();
      console.log(response);
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
