import { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET_POST } from "../../api";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginResetPassword = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();
  const { data, error, loading, request } = useFetch();
  // const password = useForm("password"); lembrar

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET_POST({
        login,
        password: password.value,
        key,
      });
      const { response, json } = await request(url, options);
      if (response.ok) console.log(json);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLogin(params.get("login") || "");
    setKey(params.get("key") || "");
  }, []);

  return (
    <div>
      <h1 className="title">Resete a senha</h1>
      {data ? (
        <p style={{ color: "#777" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Head title="Resete a senha" />
          <Input type="hidden" autoComplete="username" value={login} />
          <Input
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            {...password}
          />
          <Button disabled={loading}>
            {loading ? "Enviando..." : "Resetar"}
          </Button>
        </form>
      )}
      <Error error={error} />
    </div>
  );
};

export default LoginResetPassword;
