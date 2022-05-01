import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import getLocalStorage from "../../store/helper/getLocalStorage";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  const handleClick = async () => {
    const confirm = window.confirm("Deseja deletar a foto?");
    if (confirm) {
      const token = getLocalStorage("token", null);
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  return (
    <button className={styles.delete} disabled={loading} onClick={handleClick}>
      Deletar
    </button>
  );
};

export default PhotoDelete;
