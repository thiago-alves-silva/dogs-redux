import styles from "./Loading.module.css";
import { ReactComponent as Carregando } from "../../Assets/carregando.svg";
import { useEffect, useRef, useState } from "react";

const Loading = () => {
  const [step, setStep] = useState(0);
  const svg = useRef();

  useEffect(() => {
    const updateStep = () => setStep((step) => (step < 3 ? step + 1 : 0));
    const interval = setInterval(updateStep, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const svgGroups = Array.from(svg.current.querySelectorAll("g"));
    svgGroups.forEach((g, i) => {
      g.style.display = i <= step ? "none" : "";
    });
  }, [step]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <Carregando ref={svg} />
      </div>
    </div>
  );
};

export default Loading;
