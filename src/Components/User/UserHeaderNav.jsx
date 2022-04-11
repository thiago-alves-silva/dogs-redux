import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as Adicionar } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const [mobile, setMobile] = useState(false);
  const { userLogout } = useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="" end>
            <MinhasFotos /> {mobile && "Minhas Fotos"}
          </NavLink>
        </li>
        <li>
          <NavLink to="estatisticas">
            <Estatisticas /> {mobile && "Estatísticas"}
          </NavLink>
        </li>
        <li>
          <NavLink to="postar">
            <Adicionar /> {mobile && "Adicionar Foto"}
          </NavLink>
        </li>
        <li>
          <button onClick={userLogout}>
            <Sair /> {mobile && "Sair"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserHeaderNav;
