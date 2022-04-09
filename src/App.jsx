import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import "./App.css";
import UserStorage from "./UserContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
