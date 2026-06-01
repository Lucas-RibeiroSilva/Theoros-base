const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

/*
──────────────────────────────
REGISTRO
──────────────────────────────
*/

export async function registerUser(username, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message ?? "Erro ao criar conta",
      };
    }

    return data;
  } catch {
    return {
      error: "Erro de conexão com o servidor",
    };
  }
}

/*
──────────────────────────────
LOGIN
──────────────────────────────
*/

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message ?? "Erro ao fazer login",
      };
    }

    return data;
  } catch {
    return {
      error: "Erro ao conectar com o servidor",
    };
  }
}

/*
──────────────────────────────
SESSÃO VISITANTE
──────────────────────────────
*/

export async function createGuestSession() {
  try {
    const res = await fetch(`${API_URL}/auth/guest-session`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message ?? "Erro ao criar sessão",
      };
    }

    return data;
  } catch {
    return {
      error: "Erro ao conectar com o servidor",
    };
  }
}

/*
──────────────────────────────
LISTA DE TODAS AS VANTAGENS
──────────────────────────────
*/

export async function searchAdvantages() {
  try {
    const res = await fetch(`${API_URL}/auth/advantages`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message ?? "Erro ao buscar vantagens",
      };
    }

    return data;
  } catch {
    return {
      error: "Erro ao conectar com o servidor",
    };
  }
}
