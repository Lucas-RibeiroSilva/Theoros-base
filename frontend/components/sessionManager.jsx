import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";

import { createGuestSession } from "../services/api";

export default function SessionManager({ children, handleLogout }) {
  useEffect(() => {
    async function initializeSession() {
      //Token Login

      let token = localStorage.getItem("token");

      // Visitante
      if (!token) {
        let guestToken = localStorage.getItem("guest_token");

        // Se não exister o guest token, ele irá criar um novo
        if (!guestToken) {
          const response = await createGuestSession();

          if (response?.guestToken) {
            localStorage.setItem("guest_token", response.guestToken);

            guestToken = response.guestToken;
          }
        }

        token = guestToken;
      }

      // Valida o token
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        const timeLeft = decoded.exp - currentTime;

        // Expirou
        if (timeLeft <= 0) {
          // Usuário logado
          if (localStorage.getItem("token")) {
            if (handleLogout) {
              handleLogout(true)
            }
          } else {
            // Visitante
            localStorage.removeItem("guest_token");

            window.location.reload();
          }

          return;
        }

        // Timer global

        const timer = setTimeout(() => {
          // Logado
          if (localStorage.getItem("token")) {
            if (handleLogout) {
              handleLogout(true)
            }
          } else {
            // Visitante
            localStorage.removeItem("guest_token");

            if (handleLogout) {
              handleLogout(true)
            }
          }
        }, timeLeft * 1000);

        return () => clearTimeout(timer);
      } catch {
        if (handleLogout) {
          handleLogout(true)
        }
      }
    }

    initializeSession();
  }, [handleLogout]);

  return children;
}
