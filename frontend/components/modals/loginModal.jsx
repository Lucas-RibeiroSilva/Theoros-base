import { useState } from "react";
import { loginUser, registerUser } from "../../services/api";
import "../../styles/modals/loginModal.css";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // true = register | false = login
  const [isRegister, setIsRegister] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      onClose?.();
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!username || !registerEmail || !registerPassword) {
      setError("Preencha todos os campos");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await registerUser(
        username,
        registerEmail,
        registerPassword,
      );

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      onClose?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h1 className="auth-logo">⚔️ Theoros</h1>
        <p className="auth-subtitle">Sua plataforma de fichas de RPG</p>

        {/* ================= LOGIN ================= */}
        {!isRegister && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        )}

        {/* ================= REGISTER ================= */}
        {isRegister && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <label>Nome</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>E-mail</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </form>
        )}

        {/* SWITCH REAL (TOGGLE) */}
        <p className="auth-switch">
          {isRegister ? "Já tem conta?" : "Não tem conta?"}

          <button
            type="button"
            onClick={() => {
              setError("");
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "Entrar" : "Criar conta"}
          </button>
        </p>
      </div>
    </div>
  );
}
