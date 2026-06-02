import api from "./api";

/*
──────────────────────────────
Cria sessão visitante
──────────────────────────────
*/

export async function createGuestSession() {
  try {
    const response = await api.post("/guest-session");

    localStorage.setItem("guest_token", response.data.guestToken);
  } catch (error) {
    console.error("Erro ao criar sessão visitante:", error);
  }
}
