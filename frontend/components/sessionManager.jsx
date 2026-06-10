import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { createGuestSession } from "../services/api";

export default function SessionManager({ children, handleLogout }) {
  useEffect(() => {
    let timer;

    async function initializeSession() {
      try {
        let token = localStorage.getItem("token");

        // Se não estiver logado, usa sessão de visitante
        if (!token) {
          let guestToken = localStorage.getItem("guest_token");

          // Cria nova sessão visitante
          if (!guestToken) {
            const response = await createGuestSession();

            if (response?.error) {
              console.error("Erro ao criar sessão visitante:", response.error);

              if (handleLogout) {
                handleLogout(true);
              }

              return;
            }

            if (response?.guestToken) {
              localStorage.setItem(
                "guest_token",
                response.guestToken
              );

              guestToken = response.guestToken;
            }
          }

          token = guestToken;
        }

        // Nenhum token encontrado
        if (!token) {
          if (handleLogout) {
            handleLogout(true);
          }

          return;
        }

        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        const timeLeft = decoded.exp - currentTime;

        // Token expirado
        if (timeLeft <= 0) {
          if (localStorage.getItem("token")) {
            handleLogout?.(true);
          } else {
            localStorage.removeItem("guest_token");
            window.location.reload();
          }

          return;
        }

        timer = setTimeout(() => {
          if (localStorage.getItem("token")) {
            handleLogout?.(true);
          } else {
            localStorage.removeItem("guest_token");
            handleLogout?.(true);
          }
        }, timeLeft * 1000);
      } catch (error) {
        console.error("Erro ao validar sessão:", error);

        handleLogout?.(true);
      }
    }

    initializeSession();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [handleLogout]);

  return children;
}