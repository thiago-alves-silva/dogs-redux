import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = (props) => {
  const [comments, setComments] = useState(props.comments);
  const { login } = useContext(UserContext);
  const commentsSection = useRef();

  const timeAgo = (datetime) => {
    let difference = new Date() - new Date(datetime);
    difference = difference < 0 ? 0 : difference;
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 30 * 12));
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days < 30) return `${days}d`;
    if (months < 12) return `${months}m`;
    else return `${years}a`;
  };

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      {comments && (
        <ul className={styles.comments} ref={commentsSection}>
          {comments.map((comment) => (
            <li key={comment.comment_ID}>
              <span>
                <b>{comment.comment_author}: </b>
                {comment.comment_content}
              </span>
              <span className={styles.timeAgo}>
                {timeAgo(comment.comment_date)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
