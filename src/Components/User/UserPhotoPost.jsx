import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import styles from "./UserPhotoPost.module.css";
import { useState } from "react";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = useState({});
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    const { response } = await request(url, options);
    if (response.ok) {
      navigate("/conta");
    }
  };

  const handleImgChange = ({ target: { files } }) => {
    if (files.length) {
      setImg({
        raw: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setImg({});
    }
  };

  return (
    <div className={`${styles.photoPost} anime-left`}>
      <Head title="Poste uma foto" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Nome" {...nome} />
        <Input label="Peso" type="number" {...peso} />
        <Input label="Idade" type="number" {...idade} />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.fileInput}
          onChange={handleImgChange}
        />
        <Button disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
        <Error error={error} />
      </form>
      {img.preview && (
        <img
          src={img.preview}
          alt="Preview da imagem"
          className={styles.preview}
          width="352"
          height="352"
        />
      )}
    </div>
  );
};

export default UserPhotoPost;
