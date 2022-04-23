import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
  return (
    <section className="container" style={{ marginTop: "2rem" }}>
      <Head title="Fotos" description="Página inicial da rede social Dogs" />
      <Feed />
    </section>
  );
};

export default Home;
