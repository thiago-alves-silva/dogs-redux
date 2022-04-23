import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import { useEffect } from "react";
import { STATS_GET } from "../../api";

const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      const { response, json } = await request(url, options);
      if (response.ok) {
        console.log(json);
      }
    };

    getData();
  }, [request]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  return data ? (
    <div>
      <Head title="Estatísticas" />
      UserStats
    </div>
  ) : null;
};

export default UserStats;
