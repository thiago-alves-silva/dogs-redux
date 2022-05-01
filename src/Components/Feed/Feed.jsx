import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, resetFeed } from "../../store/feed";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import styles from "./Feed.module.css";

const Feed = ({ userId }) => {
  const { pages, loading, infinite, error } = useSelector(
    (state) => state.feed
  );
  const { token, user } = useSelector((state) => state);
  const userLoading = token.loading || user.loading;
  const dispatch = useDispatch();

  useEffect(() => {
    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY; // scroll dado
        const height = document.body.offsetHeight - 160 - window.innerHeight; // quanto resta para dar scroll

        if (scroll > height * 0.75 && !loading) {
          dispatch(fetchPhotos({ page: pages + 1, user: userId }));
        }
      }
    };

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [dispatch, infinite, loading, pages, userId]);

  useEffect(() => {
    if (!userLoading) {
      dispatch(resetFeed());
      dispatch(fetchPhotos({ page: 1, user: userId }));
    }
  }, [dispatch, userId, userLoading]);

  // Se a página for atualizada, será aguardado a autenticação do usuário para então ser exibido apenas as fotos dele na página de conta
  if (window.location.pathname === "/conta" && !user.data) {
    return <Loading />;
  }
  if (error) return <Error />;
  return (
    <>
      <FeedModal />
      <FeedPhotos />
      {!infinite && !loading && (
        <p className={styles.infinite}>Não existem mais postagens.</p>
      )}
    </>
  );
};

export default Feed;
