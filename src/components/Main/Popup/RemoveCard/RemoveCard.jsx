import React from 'react';

export default function RemoveCard({ onConfirm }) {
  return (
    <div className="popup__confirmation">
      <div className="popup__confirmation-buttons">
        <button
          type="button"
          className="popup__button-confirm"
          onClick={onConfirm}
        >
          Sí
        </button>
      </div>
    </div>
  );
}