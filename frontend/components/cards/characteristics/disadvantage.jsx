import { useState } from "react";

import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import AddIcon from "@mui/icons-material/Add";

import "./characteristics.css";

export default function CharacteristicsSection() {
  // Serve para quando ele clicar no icone de filtro mostrar os botões de filtragem
  const [filtroDesvantagem, setFiltroDesvantagem] = useState("");
  // Serve para mostrar a lista de desvantagens
  const [mostrarDesvantagens, setMostrarDesvantagens] = useState(false);
  // Filtros
  const [filters, setFilters] = useState({
    fisica: false,
    mental: false,
    social: false,
    sobrenatural: false,
    exotica: false,
  });
  /* será importante para a lista
  const desvantagensFiltradas = desvantagens.filter((d) =>
    d.toLowerCase().includes(filtroDesvantagem.toLowerCase()),
  );*/

  function handleToggleDesvantagens() {
    setMostrarDesvantagens((prev) => !prev);
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
      {/* DIREITA - DESVANTAGENS */}
      <div className="section-box2">

        {/* Titulo junto com botão "+" para abrir o modal de desvantagens */}
        <div className="section-header">
          <label>Buscar desvantagem:</label>

          <AddIcon className="add-disadvantagem" />
        </div>

        {/* Input */}
        <div className="input-wrapper2">
          <input
            type="text"
            placeholder="Digite a desvantagem"
            value={filtroDesvantagem}
            onChange={(e) => setFiltroDesvantagem(e.target.value)}
          />

          {/* Icone de filtro */}
          <FilterAltTwoToneIcon
            className="filter-icon2"
            onClick={handleToggleDesvantagens}
          />
        </div>


        {/* Botões dos filtros */}
        {mostrarDesvantagens && (
          <div className="disadvantage-filters">
            <button className={filters.fisica ? "active" : ""} onClick={() => toggleFilter("fisica")} >
              Física
            </button>

            <button className={filters.mental ? "active" : ""} onClick={() => toggleFilter("mental")}>
              Mental
            </button>

            <button className={filters.social ? "active" : ""} onClick={() => toggleFilter("social")}>
              Social
            </button>

            <button className={filters.sobrenatural ? "active" : ""} onClick={() => toggleFilter("sobrenatural")}>
              Sobrenatural
            </button>

            <button className={filters.exotica ? "active" : ""} onClick={() => toggleFilter("exotica")}>
              Exótica
            </button>
          </div>
        )}
      </div>
    </>
  );
}
