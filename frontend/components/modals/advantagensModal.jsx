import { useState, useEffect } from "react";
import { getAdvantages } from "../../services/api";

import AddIcon from "@mui/icons-material/Add";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { PiBrainDuotone } from "react-icons/pi";
import { TbGhost2 } from "react-icons/tb";
import { GiBiceps, GiAngelWings } from "react-icons/gi";
import { RiSpeakLine } from "react-icons/ri";

import "../../styles/modals/advantagensModal.css";

export default function AdvantagenModal({ onClose }) {
  const [filterText, setFilterText] = useState("");
  const [advantages, setAdvantages] = useState([]);
  const [levels, setLevels] = useState({});

  const [filters, setFilters] = useState({
    Physical: false,
    Mental: false,
    Social: false,
    Supernatural: false,
    Exotic: false,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdvantages();

        if (data?.error) {
          console.error(data.error);
          return;
        }

        setAdvantages(data);

        const initial = {};
        data.forEach((adv) => {
          initial[adv.id] = 0;
        });

        setLevels(initial);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const activeFilters = Object.entries(filters).filter(([, active]) => active).map(([key]) => key);

  const filtered = advantages.filter((adv) => {
    const name = adv.name?.toLowerCase() ?? "";
    const matchesName = name.includes(filterText.toLowerCase());

    const matchesType =
      activeFilters.length === 0
        ? true
        : activeFilters.some((type) =>
  hasType(adv, type)
);

    return matchesName && matchesType;
  });

  function toggleFilter(type) {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  function hasType(adv, typeName) {
  return adv.types?.some(
    (type) => type.types?.name === typeName
  );
}

  function getIcon(adv) {
  if (hasType(adv, "Physical")) return <GiBiceps />;
  if (hasType(adv, "Supernatural")) return <TbGhost2 />;
  if (hasType(adv, "Mental")) return <PiBrainDuotone />;
  if (hasType(adv, "Social")) return <RiSpeakLine />;
  if (hasType(adv, "Exotic")) return <GiAngelWings />;

  return null;
}

  function getTypeName(adv) {
    return adv.types ?.map((t) => t.types?.name).join(", ");

  const type = adv.types?.[0]?.types?.name;

  switch (type) {
    case "Physical":
      return "Física";

    case "Mental":
      return "Mental";

    case "Social":
      return "Social";

    case "Supernatural":
      return "Sobrenatural";

    case "Exotic":
      return "Exótica";

    default:
      return type ?? "";
  }
}

  function increaseLevel(adv) {
    if (!adv.isAllowedLevel) return;

    const current = levels[adv.id] ?? 0;

    if (current >= (adv.maxLevel ?? 0)) return;

    setLevels((prev) => ({
      ...prev,
      [adv.id]: current + 1,
    }));
  }

  function decreaseLevel(adv) {
    if (!adv.isAllowedLevel) return;

    const current = levels[adv.id] ?? 0;

    if (current <= 0) return;

    setLevels((prev) => ({
      ...prev,
      [adv.id]: current - 1,
    }));
  }

  function getCost(adv) {
    const level = levels[adv.id] ?? 0;

    const base = Number(adv.baseCost ?? 0);
    const variable = Number(adv.variableCost ?? 0);

    if (!adv.costIsVariable) return base;

    return base + level * variable;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Vantagens</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="Buscar vantagem..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="filters">
          <button className={filters.Physical ? "active" : ""} onClick={() => toggleFilter("Physical")}>Física</button>
          <button className={filters.Mental ? "active" : ""} onClick={() => toggleFilter("Mental")}>Mental</button>
          <button className={filters.Social ? "active" : ""} onClick={() => toggleFilter("Social")}>Social</button>
          <button className={filters.Supernatural ? "active" : ""} onClick={() => toggleFilter("Supernatural")}>Sobrenatural</button>
          <button className={filters.Exotic ? "active" : ""} onClick={() => toggleFilter("Exotic")}>Exótica</button>
        </div>

        <ul className="list-advantagens-modal">
          {filtered.map((adv) => (
            <li key={adv.id} className="item-advantagem-modal">

              <div className="advantage-top">
                <h3>{adv.name}</h3>

                <div className="types-container">
  {adv.types?.map((type) => (
    <span
      key={type.id}
      className="type-advantagem"
    >
      {type.types.name}
    </span>
  ))}
</div>

                <button className="add-advantage-btn">
                  <AddIcon />
                </button>
              </div>

              <div className="advantage-info">
                <div className="cost-badge">
                  {getCost(adv)} pts
                </div>

                {adv.isAllowedLevel ? (
                  <div className="level-control">
                    <button onClick={() => decreaseLevel(adv)}>-</button>
                    <span>{levels[adv.id] ?? 0}</span>
                    <button onClick={() => increaseLevel(adv)}>+</button>
                  </div>
                ) : (
                  <div className="level-disabled">Nível: --</div>
                )}

                <IoMdInformationCircleOutline className="info-icon" />
              </div>

              <p>{adv.shortDescription}</p>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}