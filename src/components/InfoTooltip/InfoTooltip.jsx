import React from 'react';
import successIcon from '../../../images/check.png';
import failIcon from '../../../images/error.png';

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
        
        <div className="popup__icon">
          <img 
            src={isSuccess ? successIcon : failIcon} 
            alt={isSuccess ? "Éxito" : "Error"} 
            className="popup__icon-image"
          />
        </div>
        
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