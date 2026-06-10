import { useState } from "react";

import "../styles/pages/create.css";

import Header from "../components/header";

import LoginModal from "../components/modals/loginModal";

import BasicSection from "../components/cards/basic/basic";
import ModifiersSection from "../components/cards/modifiers/modifiers";
import SpecializationsSection from "../components/cards/specializations/specializations";
import CharacteristicsSection from "../components/cards/characteristics/characteristics";

export default function Create({ handleLogout }) {
  /*
  ──────────────────────────────
  MODAL LOGIN
  ──────────────────────────────
  */

  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  /*
  ──────────────────────────────
  SEÇÕES
  ──────────────────────────────
  */

  const [activeSection, setActiveSection] = useState("basic");

  return (
    <>
      {/* LOGIN MODAL */}
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}

      {/* HEADER */}
      <Header handleLogout={handleLogout} />

      {/* NAVEGAÇÃO */}
      <div className="section-buttons">
        <button className={activeSection === "basic" ? "active" : ""} onClick={() => setActiveSection("basic")}>
          Básico
        </button>

        <button className={activeSection === "characteristics" ? "active" : ""} onClick={() => setActiveSection("characteristics")}>
          Características
        </button>

        <button className={activeSection === "modifiers" ? "active" : ""} onClick={() => setActiveSection("modifiers")}>
          Modificadores
        </button>

        <button className={activeSection === "specializations" ? "active" : ""} onClick={() => setActiveSection("specializations")}>
          Especializações
        </button>
      </div>

      {/* SEÇÕES */}

      <div className="sections">
        {activeSection === "basic" && <BasicSection />}

        {activeSection === "characteristics" && <CharacteristicsSection />}

        {activeSection === "modifiers" && <ModifiersSection />}

        {activeSection === "specializations" && <SpecializationsSection />}
      </div>
    </>
  );
}
