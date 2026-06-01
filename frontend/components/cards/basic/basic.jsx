import { useState } from "react";

import "../../../styles/sections/sectionsCreate.css";
import "./basic.css";

export default function BasicSection() {

    // Estado da imagem
    const [imageURL, setImageURL] = useState("");

    // Preview da imagem
    function handleImageChange(event) {
        const file = event.target.files[0];

        if (file) {
            const blobURL = URL.createObjectURL(file);
            setImageURL(blobURL);
        }
    }

    return (
        <div className="section-overlay">

            <div className="section">

                <h2>Informação Básica do Personagem</h2>

                <div className="section-grid">

                    {/* INFORMAÇÕES */}
                    <div className="form-informations">

                        {/* IMAGEM */}
                        <div id="personagem-imagem">

                            <input
                                type="file"
                                id="personagem-input-imagem"
                                name="personagem-imagem"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {!imageURL && (
                                <p>Selecione uma imagem</p>
                            )}

                            {imageURL && (
                                <img
                                    id="preview"
                                    src={imageURL}
                                    alt="Preview do personagem"
                                />
                            )}

                        </div>

                        {/* NOME */}
                        <label htmlFor="name">
                            Nome
                        </label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Digite o nome"
                            autoComplete="off"
                            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');}}
                        />

                        {/* GÊNERO */}
                        <label htmlFor="gender">
                            Gênero
                        </label>
                        <input
                            type="text"
                            id="gender"
                            placeholder="Digite o gênero"
                            autoComplete="off"
                            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');}}
                        />

                        {/* ALTURA */}
                        <label htmlFor="altura">
                            Altura
                        </label>

                        <input
                            type="number"
                            id="altura"
                            placeholder="Digite a altura"
                            onInput={(e) => {e.target.value = e.target.value.replace(/[^0-9.,]/g, '');}}
                        />

                        {/* IDADE */}
                        <label htmlFor="age">
                            Idade
                        </label>

                        <input
                            type="number"
                            id="age"
                            placeholder="Digite a idade"
                            onInput={(e) => {e.target.value = e.target.value.replace(/[^0-9]/g, '');}}
                        />

                        {/* RAÇA */}
                        <label htmlFor="raca">
                            Raça
                        </label>

                        <input
                            type="text"
                            id="raca"
                            placeholder="Digite a raça"
                            autoComplete="off"
                            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');}}
                        />

                    </div>

                    {/* STATUS */}
                    <div className="form-stats">

                        <label htmlFor="ST">Força</label>
                        <input type="number" id="ST" />

                        <label htmlFor="HP">Vida</label>
                        <input type="number" id="HP" />

                        <label htmlFor="DX">Destreza</label>
                        <input type="number" id="DX" />

                        <label htmlFor="FP">Fadiga</label>
                        <input type="number" id="FP" />

                        <label htmlFor="IQ">Inteligência</label>
                        <input type="number" id="IQ" />

                        <label htmlFor="PER">Percepção</label>
                        <input type="number" id="PER" />

                        <label htmlFor="Will">Vontade</label>
                        <input type="number" id="Will" />

                    </div>

                </div>

                {/* HISTÓRIA */}
                <div className="form-history">

                    <label htmlFor="historia">
                        História
                    </label>

                    <textarea
                        id="historia"
                        name="historia"
                        placeholder="Escreva a história do personagem"
                    />

                    <label htmlFor="alinhamento">
                        Alinhamento
                    </label>

                    <select id="alinhamento">

                        <option value="bom-good">
                            Bom
                        </option>

                        <option value="neutro-good">
                            Neutro
                        </option>

                        <option value="mal-good">
                            Maligno
                        </option>

                    </select>

                </div>

            </div>

        </div>
    );
}