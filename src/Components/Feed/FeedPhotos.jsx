import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";
import { useSelector } from "react-redux";

const FeedPhotos = () => {
  const { data, loading, error } = useSelector((state) => state.feed);

  if (error) return <Error error={error} />;
  return data ? (
    <>
      <ul className={`${styles.feed} anime-left`}>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </ul>
      {loading && <Loading />}
    </>
  ) : null;
};

export default FeedPhotos;
