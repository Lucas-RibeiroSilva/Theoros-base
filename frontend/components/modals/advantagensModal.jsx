import { useState, useEffect } from "react";

// Api para buscar as vantagens
import { searchAdvantages } from "../../services/api";

// Icone Filtro
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
// Icone "+"
import AddIcon from "@mui/icons-material/Add";
// Icone ⓘ para exibir Modal com a informação completa da vantagem
import { IoMdInformationCircleOutline } from "react-icons/io";

// Icones dos tipos
import { PiBrainDuotone } from "react-icons/pi"; // Mental
import { TbGhost2 } from "react-icons/tb"; // Sobrenatural
import { GiBiceps } from "react-icons/gi"; // Física
import { RiSpeakLine } from "react-icons/ri"; // Social
import { GiAngelWings } from "react-icons/gi"; // Exotica

import "../../styles/modals/advantagensModal.css";

export default function AdvantagenModal({ onClose }) {
  // Texto digitado na busca
  const [filterText, setFilterText] = useState("");
  /// Lista de vantagens carregadas da API
  const [advantages, setAdvantages] = useState([]);
  // Armazena o nível atual de cada vantagem
  const [levels, setLevels] = useState({});

  // Habilitar os filtros
  const [filters, setFilters] = useState({
    fisica: false,
    mental: false,
    social: false,
    sobrenatural: false,
    exotica: false,
  });

  useEffect(() => {

    // Busca as vantagens na API e inicializa os níveis
    async function load() {
      try {
        const data = await searchAdvantages();

        setAdvantages(data);
        const initialLevels = {};

        // Pega o nível da vantagem, se não tiver deixa como 0
        data.forEach((adv) => {
          initialLevels[adv.id] = adv.nivel.atual || 0;
        });

        setLevels(initialLevels);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);


  const filtered = advantages.filter((adv) => {
    // Filtra as vantagens pelo nome digitado no campo de busca
    const matchesName = adv.nome ?.toLowerCase().includes(filterText.toLowerCase());
    // Obtém todos os filtros atualmente ativos
    const activeFilters = Object.entries(filters).filter(([, active]) => active).map(([key]) => key);
    // Verifica se a vantagem possui pelo menos um dos tipos selecionados
    const matchesType = activeFilters.length === 0 ? true : activeFilters.some((type) => adv.tipos[type]);

    return matchesName && matchesType;
  });

  // Ativa ou desativa um filtro de tipo
  function toggleFilter(type) {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  // Adicionará o icone conforme o tipo da vantagem
  function getIcon(adv) {
    if (adv.tipos.fisica) return <GiBiceps />;
    if (adv.tipos.sobrenatural) return <TbGhost2 />;
    if (adv.tipos.mental) return <PiBrainDuotone />;
    if (adv.tipos.social) return <RiSpeakLine />;
    if (adv.tipos.exotica) return <GiAngelWings />;
    return null;
  }

  // Adicionará o nome do tipo da vantagem
  function getTypeName(adv) {
    if (adv.tipos.fisica) return "Física";
    if (adv.tipos.sobrenatural) return "Sobrenatural";
    if (adv.tipos.mental) return "Mental";
    if (adv.tipos.social) return "Social";
    if (adv.tipos.exotica) return "Exótica";

    return "";
  }

  // Função para aumentar o nível
  function increaseLevel(adv) {
    const current = levels[adv.id];

    if (current >= adv.nivel.maximo) return; // Impede ultrapassar o nível máximo

    setLevels({
      ...levels,
      [adv.id]: current + 1,
    });
  }

  // Função para diminuir o nível
  function decreaseLevel(adv) {
    const current = levels[adv.id];

    if (current <= 1) return; // Impede que o nível fique menor que 1

    setLevels({
      ...levels,
      [adv.id]: current - 1,
    });
  }

  // Calcula o custo final da vantagem com base no nível atual
  function getCost(adv) {
    if (!adv.custo.variavel) return adv.custo.base;

    const level = levels[adv.id] || adv.nivel.atual;

    return adv.custo.base + (level - 1) * adv.custo.valorVariavel;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Titulo junto com botão "+" para adicionar a vantagem */}
        <div className="modal-header">
          <h2>Vantagens</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Input para buscar vantagem */}
        <div className="modal-search">
          <input
            type="text"
            placeholder="Buscar vantagem..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        
        {/* Botões dos filtros */}
        <div className="filters">
          <button className={filters.fisica ? "active" : ""} onClick={() => toggleFilter("fisica")}>
            Física
          </button>

          <button className={filters.mental ? "active" : ""} onClick={() => toggleFilter("mental")} >
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

        {/* Lista das vantagens */}
        <ul className="list-advantagens-modal">
          {filtered.map((adv) => (

            // Estrutura de cada vantagem
            <li key={adv.id} className="item-advantagem-modal">
              {/* Nome da vantagem, tipo dela e o botão "+" para adicionar a vantagem */}
              <div className="advantage-top">
                  <h3>{adv.nome}</h3>

                <div className="type-advantagem">
                  <span>{getIcon(adv)} {getTypeName(adv)}</span>
                </div>

                <button className="add-advantage-btn">
                  <AddIcon />
                </button>
              </div>

              {/* Informações da vantagem */}
              <div className="advantage-info">
                <div className="cost-badge">{getCost(adv)} pts</div>

                {/* Se permitir nivel (No Json em "nivel": {"permite": true}), aparecerá os botões para auemntar e diminuir o nivel*/}
                {adv.nivel.permite ? (
                  <div className="level-control">
                    <button onClick={() => decreaseLevel(adv)}>-</button>

                    <span>{levels[adv.id]}</span>

                    <button onClick={() => increaseLevel(adv)}>+</button>
                  </div>
                ) : (
                  // Se naõ permiter nivel apareceça isso "Nivel: --""
                  <div className="level-disabled">Nível: --</div>
                )}

                <IoMdInformationCircleOutline
                  className="info-icon"
                />
              </div>
              {/* Breve descrição da vantagem */}
              <p>{adv.descricao.breve}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}