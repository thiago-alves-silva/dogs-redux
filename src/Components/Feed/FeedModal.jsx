import { useEffect } from "react";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import styles from "./FeedModal.module.css";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  const handleOutsideClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      console.log(target, currentTarget);
      setModalPhoto(null);
    }
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      const { url, options } = PHOTO_GET(photo.id);
      const { response, json } = await request(url, options);
      if (response.ok) {
        console.log(json);
      }
    };

    fetchPhoto();
  }, [photo, request]);

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <Error error={error} />
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
