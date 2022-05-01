import { useState } from "react";
import { useDispatch } from "react-redux";
import { COMMENT_POST } from "../../api";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import getLocalStorage from "../../store/helper/getLocalStorage";
import { addComment } from "../../store/photo";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, single }) => {
  const { loading, error, request } = useFetch();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getLocalStorage("token", null);
    const { url, options } = COMMENT_POST(id, token, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      dispatch(addComment(json));
    }
  };

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        rows="1"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        disabled={loading}
      />
      <button disabled={loading} className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
