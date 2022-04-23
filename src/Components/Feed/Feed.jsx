import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import Loading from "../Helper/Loading";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [pages, setPages] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(true);
  const { loading: contextLoading } = useContext(UserContext);

  useEffect(() => {
    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY; // scroll dado
        const height = document.body.offsetHeight - window.innerHeight; // quanto tem para dar scroll

        if (scroll > height * 0.8 && !loading) {
          setPages((pages) => [...pages, pages.length + 1]);
        }
      }
    };

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite, loading]);

  // Se a página for atualizada, será aguardado a autenticação do usuário para então ser exibido apenas as fotos dele na página de conta
  if (window.location.pathname === "/conta" && contextLoading) {
    return <Loading />;
  }
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          page={page}
          user={user}
          setModalPhoto={setModalPhoto}
          setLoading={setLoading}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

export default Feed;
