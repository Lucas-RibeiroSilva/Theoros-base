import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/header.css";

import Menu from "./menu";

import LoginModal from "../components/modals/loginModal";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

export default function Header({ handleLogout }) {
  // Estados para controle de UI
  const [menuOpen, setMenuOpen] = useState(false); // Controla abertura do menu lateral
  const [doorHover, setDoorHover] = useState(false); // Controla hover do ícone de logout
  const [showLoginModal, setShowLoginModal] = useState(false); // Controla exibição do modal de login

  // Tokens e status de autenticação
  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const navigate = useNavigate();

  // Verifica se é visitante
  function handleProfileClick() {
    console.log("token:", localStorage.getItem("token"));
    console.log("guest:", localStorage.getItem("guest_token"));

    if (isLogged) {
      console.log("indo para profile");
      navigate("/profile");
      return;
    }

    console.log("abrindo login");
    openLoginModal();
  }

  return (
    <>
      <header className="header">
        {/* LOGOUT */}
        <button onClick={() => handleLogout()} className="btn-logout-icon" onMouseEnter={() => setDoorHover(true)} onMouseLeave={() => setDoorHover(false)}>
          {doorHover ? (
            <MeetingRoomOutlinedIcon className="logout-door-icon" />
          ) : (
            <DoorBackOutlinedIcon className="logout-door-icon" />
          )}
        </button>

        <h1>⚔️ Theoros</h1>

        <div className="header-right">
          {/* MENU */}
          <button onClick={() => setMenuOpen(true)} className="btn-menu">
            Menu
          </button>

          {/* PERFIL */}
          <button onClick={handleProfileClick} className="profile-icon">
            <AccountCircleOutlinedIcon className="default-profile-icon" />
          </button>

          {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
        </div>
      </header>

      {/* MODAL LOGIN */}
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </>
  );
}
