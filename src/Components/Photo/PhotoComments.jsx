import { useEffect, useRef } from "react";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";
import { useSelector } from "react-redux";

const PhotoComments = (props) => {
  const { data } = useSelector((state) => state.user);
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
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [props.comments]);

  return (
    <>
      {!!props.comments.length && (
        <ul
          className={`${styles.comments} ${props.single ? styles.single : ""}`}
          ref={commentsSection}
        >
          {props.comments.map((comment) => (
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
      {data && <PhotoCommentsForm id={props.id} single={props.single} />}
    </>
  );
};

export default PhotoComments;
