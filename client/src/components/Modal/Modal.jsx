import "./Modal.css";

const Modal = ({ open, title, children, onClose }) => {
  // If modal is not open, render nothing
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop click from closing modal when clicking inside */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
