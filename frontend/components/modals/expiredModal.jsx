import "../../styles/modals/expiredModal.css";

export default function ExpiredModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>⚠️ Sessão encerrada</h2>

        <p>Você foi deslogado automaticamente❗</p>

        <button onClick={onClose} className="btn-primary">
          Fechar
        </button>
      </div>
    </div>
  );
}