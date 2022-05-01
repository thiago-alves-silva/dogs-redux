import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import { lazy, Suspense, useEffect } from "react";
import { STATS_GET } from "../../api";
import getLocalStorage from "../../store/helper/getLocalStorage";
const UserStatsGraphs = lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  useEffect(() => {
    const getData = () => {
      const token = getLocalStorage("token", null);
      const { url, options } = STATS_GET(token);
      request(url, options);
    };

    getData();
  }, [request]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  return data ? (
    <Suspense fallback={<></>}>
      <Head title="Estatísticas" />
      <UserStatsGraphs data={data} />
    </Suspense>
  ) : null;
};

export default UserStats;
