import React from "react";
import closeButton from "../../../../images/CloseIcon.png";

export default function Popup(props) {
  const { onClose, title, children, isOpen = true } = props;
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div
        className={`popup__container ${
          !title ? "popup__container_container_image" : ""
        }`}
      >
        <button
          className="popup__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          <img
            src={closeButton}
            alt="Botón Cerrar"
            className="popup__close-button"
          />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
