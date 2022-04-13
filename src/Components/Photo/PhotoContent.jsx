import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import styles from "./PhotoContent.module.css";

const PhotoContent = ({ data: { photo, comments } }) => {
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} width="640" height="640" />
      </div>
      <div className={styles.details}>
        <div className={styles.author}>
          <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
          <span className={styles.acessos}>{photo.acessos}</span>
        </div>
        <h1 className="title">
          <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso}kg</li>
          <li>
            {photo.idade} {+photo.idade > 1 ? "anos" : "ano"}
          </li>
        </ul>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
