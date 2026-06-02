import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/header.css";

import Menu from "./menu";

import LoginModal from "../components/modals/loginModal";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

export default function Header({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [doorHover, setDoorHover] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const navigate = useNavigate();

  // Verifica se é visitante
  const isGuest =
    !localStorage.getItem("token") && localStorage.getItem("guest_token");

  // Clique no perfil
  function handleProfileClick() {
    // Visitante → abre modal login
    if (isGuest) {
      openLoginModal()

      return;
    }
    // Usuário logado
    navigate("/profile");
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
