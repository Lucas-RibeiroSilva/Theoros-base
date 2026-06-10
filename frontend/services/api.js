const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

// Helper interno — monta os headers com token se existir
function getHeaders(auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token =
      localStorage.getItem("token") ?? localStorage.getItem("guest_token");

    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Helper interno — faz o fetch e trata erros de forma padronizada
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, options);

    let data;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return {
        error: data?.error ?? `Erro ${res.status}: ${res.statusText}`,
      };
    }

    return data;
  } catch (error) {
    console.error(error);

    return {
      error: "Erro de conexão com o servidor",
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────

/*
══════════════════════════════════════════════════════
AUTH
══════════════════════════════════════════════════════
*/

export async function registerUser(username, email, password) {
  return request("/auth/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ username, email, password }),
  });
}

export async function loginUser(email, password) {
  return request("/auth/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
}

export async function createGuestSession() {
  return request("/auth/guest-session", {
    method: "POST",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
TRAITS — Vantagens e Desvantagens
══════════════════════════════════════════════════════
*/

export async function getAdvantages() {
  return request("/traits/advantages", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getAdvantageById(id) {
  return request(`/traits/advantages/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getDisadvantages() {
  return request("/traits/disadvantages", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getDisadvantageById(id) {
  return request(`/traits/disadvantages/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
LIMITATIONS — Limitações
══════════════════════════════════════════════════════
*/

export async function getLimitations() {
  return request("/limitations", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getLimitationById(id) {
  return request(`/limitations/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
CARDS — Fichas
══════════════════════════════════════════════════════
*/

export async function getCards() {
  return request("/cards", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getCardById(id) {
  return request(`/cards/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function createCard(cardData) {
  return request("/cards", {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(cardData),
  });
}

export async function updateCard(id, cardData) {
  return request(`/cards/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(cardData),
  });
}

export async function deleteCard(id) {
  return request(`/cards/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  });
}

/*
══════════════════════════════════════════════════════
EXPERTISES — Perícias
══════════════════════════════════════════════════════
*/

export async function getExpertises() {
  return request("/expertises", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getExpertiseById(id) {
  return request(`/expertises/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
EXPANSIONS — Ampliações
══════════════════════════════════════════════════════
*/

export async function getExpansions() {
  return request("/expansions", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getExpansionById(id) {
  return request(`/expansions/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
TECHNIQUES — Técnicas
══════════════════════════════════════════════════════
*/

export async function getTechniques() {
  return request("/techniques", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getTechniqueById(id) {
  return request(`/techniques/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
MAGICS — Magias
══════════════════════════════════════════════════════
*/

export async function getMagics() {
  return request("/magics", {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function getMagicById(id) {
  return request(`/magics/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

/*
══════════════════════════════════════════════════════
LOOKUP — Classes, Tipos, Dificuldades, Raças
══════════════════════════════════════════════════════
*/

export async function getClasses() {
  return request("/classes", { method: "GET", headers: getHeaders() });
}

export async function getTypes() {
  return request("/types", { method: "GET", headers: getHeaders() });
}

export async function getDifficulties() {
  return request("/difficulties", { method: "GET", headers: getHeaders() });
}

export async function getRaces() {
  return request("/races", { method: "GET", headers: getHeaders() });
}

export async function getRaceById(id) {
  return request(`/races/${id}`, { method: "GET", headers: getHeaders() });
}

/*
══════════════════════════════════════════════════════
RATINGS — Avaliações
══════════════════════════════════════════════════════
*/

export async function getRatingsByCard(cardId) {
  return request(`/ratings/${cardId}`, {
    method: "GET",
    headers: getHeaders(),
  });
}

export async function rateCard(cardId, score) {
  return request("/ratings", {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify({ cardId, score }),
  });
}
