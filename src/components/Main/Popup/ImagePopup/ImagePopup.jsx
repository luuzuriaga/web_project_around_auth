import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__modal">
        <img src={card.link} alt={card.name} className="popup__modal-content" />
        <p className="popup__modal-description">{card.name}</p>;
      </div>
    </div>
  );
}
