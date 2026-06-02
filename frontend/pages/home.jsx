import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/pages/home.css";

import Header from "../components/header";

import LoginModal from "../components/modals/loginModal";

export default function Home({ handleLogout }) {
  const navigate = useNavigate();
  //Nome usuário

  /*
  ──────────────────────────────
  LOGIN MODAL
  ──────────────────────────────
  */

  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
      const username = localStorage.getItem("username") || "Aventureiro(a)"; // se não tiver login vem como Aventureiro(a)
      setUsername(username);
  }, []);

  return (
    <>

      {/* HEADER */}
      <Header handleLogout={handleLogout} />

      {/* MAIN */}

      <main className="home-main">
        <span>
          Olá, {username}!
        </span>
        <h2>Bem-vindo ao Theoros!</h2>

        <p>Sua plataforma de fichas de RPG está pronta.</p>

        <button onClick={() => navigate("/create")} className="btn-primary">
          + Criar nova ficha
        </button>
        
      </main>
    </>
  );
}
