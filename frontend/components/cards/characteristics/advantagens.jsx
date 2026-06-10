import { useState } from "react";

import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import AddIcon from "@mui/icons-material/Add";
import AdvantagenModal from "../../modals/advantagensModal";

import "./characteristics.css";

export default function AdvantagensSection() {
  // Serve para quando ele clicar no icone de filtro mostrar os botões de filtragem
  const [filtroVantagem, setFiltroVantagem] = useState("");
  // Serve para ver se a lista de vantagens esta aparecendo ou não na tela
  const [mostrarVantagens, setMostrarVantagens] = useState(false);
  // Serve para ver se o modal está ou não na tela
  const [showAdvantagensModal, setShowAdvantagensModal] = useState(false);
  // Filtros
  const [filters, setFilters] = useState({
    Physical: false,
    Mental: false,
    Social: false,
    Supernatural: false,
    Exotic: false,
  });

  // Funções para abrir e fechar o modal de adicionar Vantagens
  function openAdvantagensModal() {
    setShowAdvantagensModal(true);
  }
  function closeAdvantagensModal() {
    setShowAdvantagensModal(false);
  }

  /* será importante para a lista
  const vantagensFiltradas = vantagens.filter((v) =>
    v.toLowerCase().includes(filtroVantagem.toLowerCase()),
  );
  */

  // Servirá para mostrar a lista de vantagens
  function handleToggleVantagens() {
    setMostrarVantagens((prev) => !prev);
  }

  // Ativa ou desativa um filtro de tipo
  function toggleFilter(type) {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  return (
    <>
      {/* ESQUERDA - VANTAGENS */}
      <div className="section-box">

        {/* Titulo junto com botão "+" para abrir o modal de desvantagens */}
        <div className="section-header">
          <label>Buscar vantagem:</label>

          <AddIcon className="add-advantagem" onClick={openAdvantagensModal} />
        </div>

        {/* Input */}
        <div className="input-wrapper">

          <input
            type="text"
            placeholder="Digite a vantagem"
            value={filtroVantagem}
            onChange={(e) => setFiltroVantagem(e.target.value)}
          />

          {/* Icone de filtro*/}
          <FilterAltTwoToneIcon
            className="filter-icon"
            onClick={handleToggleVantagens}
          />

        </div>


        {/*Botões dos filtros */}
        {mostrarVantagens && (
          <div className="advantage-filters">
            <button
              className={filters.Physical ? "active" : ""}
              onClick={() => toggleFilter("Physical")}
            >
              Física
            </button>

            <button
              className={filters.Mental ? "active" : ""}
              onClick={() => toggleFilter("Mental")}
            >
              Mental
            </button>

            <button
              className={filters.Social ? "active" : ""}
              onClick={() => toggleFilter("Social")}
            >
              Social
            </button>

            <button
              className={filters.Supernatural ? "active" : ""}
              onClick={() => toggleFilter("Supernatural")}
            >
              Sobrenatural
            </button>

            <button
              className={filters.Exotic ? "active" : ""}
              onClick={() => toggleFilter("Exotic")}
            >
              Exótica
            </button>
          </div>
        )}
      </div>

      {/* MODAL Vantagens */}
      {showAdvantagensModal && (
        <AdvantagenModal onClose={closeAdvantagensModal} />
      )}
    </>
  );
}
