import { useEffect, useState } from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [acessos, setAcessos] = useState(0);
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    setAcessos(data.reduce((acc, { acessos }) => acc + Number(acessos), 0));
    setGraph(data.map((i) => ({ x: i.title, y: Number(i.acessos) })));
  }, [data]);

  return (
    <section className={`${styles.graph} anime-left`}>
      <div className={`${styles.acessos} ${styles.graphItem}`}>
        <p>Acessos: {acessos}</p>
      </div>
      {!!data.length && (
        <>
          <div className={styles.graphItem}>
            <VictoryPie
              data={graph}
              innerRadius={50}
              padding={{ left: 80, right: 80 }}
              style={{
                data: {
                  fillOpacity: 0.8,
                  stroke: "#fff",
                  strokeWidth: 3,
                },
                labels: {
                  fontSize: 14,
                  fill: "#333",
                },
              }}
            />
          </div>
          <div className={styles.graphItem}>
            <VictoryChart
              padding={{ top: 30, bottom: 50, left: 60, right: 70 }}
            >
              <VictoryBar alignment="start" data={graph}></VictoryBar>
            </VictoryChart>
          </div>
        </>
      )}
    </section>
  );
};

export default UserStatsGraphs;
