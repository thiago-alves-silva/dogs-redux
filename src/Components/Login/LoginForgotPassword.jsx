import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST_POST } from "../../api";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginForgotPassword = () => {
  const login = useForm();
  const { data, error, loading, request } = useFetch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST_POST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });
      request(url, options);
    }
  };

  return (
    <section className="anime-left">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#777" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="E-mail/Usuário" {...login} />
          <Button disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginForgotPassword;
