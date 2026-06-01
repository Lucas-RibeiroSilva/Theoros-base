import { useState } from "react";

import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";

import "./characteristics.css";
import DisadvantagensSection from "./disadvantage";
import AdvantagensSection from "./advantagens";

export default function CharacteristicsSection() {
    return (
        <>
        <div className="filter-align">
            
            {/* Esquerda - Vantagens */}
            <div className="filter-advantagens">
                <AdvantagensSection />
            </div>

            {/* Direita - Desvantagens */}
            <div className="filter-disadvantagens">
                <DisadvantagensSection />
            </div>

        </div>
        </>
    );
}