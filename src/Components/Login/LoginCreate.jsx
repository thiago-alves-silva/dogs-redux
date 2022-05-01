import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { USER_POST } from "../../api";
import Head from "../Helper/Head";
import { userLogin } from "../../store/user";
import { useDispatch } from "react-redux";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  // const password = useForm();
  const password = useForm("password");
  const { error, loading, request } = useFetch();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        const user = { username: username.value, password: password.value };
        dispatch(userLogin(user));
      }
    }
  };

  return (
    <div className="anime-left">
      <Head
        title="Crie sua conta"
        description="Página de cadastro da rede social Dogs"
      />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" autoComplete="username" {...username} />
        <Input label="E-mail" autoComplete="username" type="email" {...email} />
        <Input
          label="Senha"
          autoComplete="new-password"
          type="password"
          {...password}
        />
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>
        <Error error={error} />
      </form>
    </div>
  );
};

export default LoginCreate;
