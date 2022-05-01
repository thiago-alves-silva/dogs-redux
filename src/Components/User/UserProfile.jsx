import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className="container">
      <Head title={`Perfil do ${user}`} />
      <h1 className="title">{user}</h1>
      <Feed userId={user} />
    </section>
  );
};

export default UserProfile;
