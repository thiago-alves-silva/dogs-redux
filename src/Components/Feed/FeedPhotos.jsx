import { useEffect } from "react";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ setModalPhoto, user, page, setLoading, setInfinite }) => {
  const total = 3;
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const { url } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url);
      if (response.ok && json.length < total) {
        setInfinite(false);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, [request, user, page, setLoading, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  return data ? (
    <div>
      <ul className={`${styles.feed} anime-left`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

export default FeedPhotos;
