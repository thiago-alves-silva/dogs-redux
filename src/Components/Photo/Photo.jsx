import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPhoto } from "../../store/photo";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, error, loading } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [id, dispatch]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  return data ? (
    <section className="container">
      <Head title={`Foto do ${data.photo.title}`} />
      <PhotoContent single={true} />
    </section>
  ) : null;
};

export default Photo;
