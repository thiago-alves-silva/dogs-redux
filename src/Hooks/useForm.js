import { useState } from "react";

const validation = {
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: "Preencha um e-mail válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha deve conter no mínimo:<br>" +
      "• 1 caracter numérico<br>" +
      "• 1 caracter minúsculo<br>" +
      "• 1 caracter maiúsculo<br>" +
      "• 8 caracteres",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (value) => {
    if (type === false) return true;

    if (value.trim().length === 0) {
      setError("Preencha este campo");
      return false;
    }
    if (validation[type] && !validation[type].regex.test(value)) {
      setError(validation[type].message);
      return false;
    }
    setError(null);
    return true;
  };

  const onChange = ({ target }) => {
    if (error) validate(target.value);
    setValue(target.value);
  };

  return {
    value,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
