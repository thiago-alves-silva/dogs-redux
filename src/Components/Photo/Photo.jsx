import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url } = PHOTO_GET(id);
    request(url);
  }, [id, request]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  return data ? (
    <section className="container">
      <PhotoContent data={data} single={true} />
    </section>
  ) : null;
};

export default Photo;
