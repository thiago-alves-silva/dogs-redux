import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      case "/conta/postar":
        setTitle("Poste sua foto");
        break;
      default:
        setTitle("Minha Conta");
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
