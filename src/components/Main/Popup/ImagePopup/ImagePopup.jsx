import React from "react";

export default function ImagePopup({ card, onClose, isOpen = true }) {
  if (!card) return null;

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__modal">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img
            src="./images/CloseIcon.png"
            alt="Botón Cerrar"
            className="popup__close-button"
          />
        </button>
        <img 
          src={card.link} 
          alt={card.name} 
          className="popup__modal-content" 
        />
        <p className="popup__modal-description">{card.name}</p>
      </div>
    </div>
  );
}