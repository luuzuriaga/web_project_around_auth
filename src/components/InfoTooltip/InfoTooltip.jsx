import React from 'react';
import successIcon from '../../../images/success-icon.png';
import failIcon from '../../../images/fail-icon.png';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={isSuccess ? successIcon : failIcon}
          alt={isSuccess ? 'Éxito' : 'Error'}
        />
        <h2 className="popup__message">
          {isSuccess
            ? '¡Correcto! Ya estás registrado.'
            : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;