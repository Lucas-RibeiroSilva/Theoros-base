import { useNavigate } from "react-router-dom";

import "../styles/components/menu.css";

export default function Menu({ closeMenu }) {
  const navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
    closeMenu();
  }

  return (
    <div className="menu-overlay">

      <div className="menu-container">

        {/* Fechar menu */}
        <button onClick={closeMenu} className="btn-close">
          X
        </button>

        {/* Opções */}
        <nav className="menu-links">

          <button onClick={() => handleNavigate("/")}>
            Home
          </button>

          <button onClick={() => handleNavigate("/create")}>
            Criar
          </button>

          <button onClick={() => handleNavigate("/")}>
            Fichas
          </button>

          <button onClick={() => handleNavigate("/")}>
            Perfil
          </button>

          <button onClick={() => handleNavigate("/")}>
            Documentação
          </button>

        </nav>

      </div>

    </div>
  );
}