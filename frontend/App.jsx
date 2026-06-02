import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home";
import Create from "./pages/create";
import Profile from "./pages/profile";

import SessionManager from "./components/sessionManager";

import ExpiredModal from "./components/modals/expiredModal";

export default function App() {
  const navigate = useNavigate();

  // MODAL GLOBAL
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  //FECHAR MODAL
  const closeExpiredModal = () => {
    setShowExpiredModal(false);

    navigate("/");
  };

  //LOGOUT GLOBAL
  const handleLogout = (autoLogout = false) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("guest_token");

    // Logout automático
    if (autoLogout) {
      setShowExpiredModal(true);

      return;
    }

    // Logout manual
    navigate("/");
  };

  return (
    <SessionManager handleLogout={handleLogout}>
      {/* MODAL GLOBAL */}

      {showExpiredModal && <ExpiredModal onClose={closeExpiredModal} />}

      <Routes>
        <Route path="/" element={<Home handleLogout={handleLogout} />} />
        <Route path="/create" element={<Create handleLogout={handleLogout} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </SessionManager>
  );
}
