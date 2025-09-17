import React from 'react';
//import successIcon from '../../../images/success-icon.png';
//import failIcon from '../../../images/fail-icon.png';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  // SVG del check verde para éxito
  const SuccessIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="60" fill="#00C853"/>
      <circle cx="60" cy="60" r="50" fill="#FFFFFF"/>
      <circle cx="60" cy="60" r="40" fill="#00C853"/>
      <path 
        d="M45 60L55 70L75 50" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  // SVG del X rojo para error
  const ErrorIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="60" fill="#FF5252"/>
      <circle cx="60" cy="60" r="50" fill="#FFFFFF"/>
      <circle cx="60" cy="60" r="40" fill="#FF5252"/>
      <path 
        d="M45 45L75 75M75 45L45 75" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  );

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
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
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