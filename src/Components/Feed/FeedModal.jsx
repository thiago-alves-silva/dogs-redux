import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPhoto } from "../../store/photo";
import { closeModal } from "../../store/ui";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import styles from "./FeedModal.module.css";

const FeedModal = () => {
  const { modal } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  const handleOutsideClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      dispatch(resetPhoto());
      dispatch(closeModal());
    }
  };

  useEffect(
    () => () => {
      dispatch(resetPhoto());
      dispatch(closeModal());
    },
    [dispatch]
  );

  return (
    modal && (
      <div className={styles.modal} onClick={handleOutsideClick}>
        <Error error={error} />
        {loading && <Loading />}
        {data && <PhotoContent />}
      </div>
    )
  );
};

export default FeedModal;
