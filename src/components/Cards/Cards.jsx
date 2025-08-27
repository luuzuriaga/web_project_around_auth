import deleteButton from "../../../images/Trash.png";
import React from "react";

export default function Card(props) {
  const { 
    handleOpenPopup, 
    card, 
    isLiked, 
    onCardLike, 
    onCardDelete 
  } = props;

  // Configuración para el popup de imagen ampliada
  const imagePopupConfig = {
    type: "image",
    title: card.name,
    card: {
      name: card.name,
      link: card.link,
    },
  };

  // Configuración para el popup de confirmación de eliminación
  const deletePopupConfig = {
    type: "removeCard",
    title: "¿Estás seguro?",
    cardToDelete: card
  };

  // Clase dinámica para el botón de like
  const cardLikeButtonClassName = `button__like ${
    isLiked ? "button__like_active" : ""
  }`;

  // Maneja el click en el botón de like
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(card);
  };

  // Maneja el click en el botón de eliminar
  const handleDeleteClick = (e) => {
    e.stopPropagation();
      handleOpenPopup({  // Usa handleOpenPopup en lugar de onCardDelete
    type: "removeCard",
    title: "¿Estás seguro?",
    cardToDelete: card
  });
  };

  // Maneja el click en la imagen para ampliarla
  const handleImageClick = () => {
    handleOpenPopup(imagePopupConfig);
  };

  return (
    <div className="elements__group">
      <div className="elements__card">
        {/* Botón de eliminar (ahora abre popup de confirmación) */}
        <button
          className="elements__button-delete"
          type="button"
          aria-label="Delete card"
          onClick={handleDeleteClick}
        >
          <img
            className="button__delete"
            src={deleteButton}
            alt="Botón Eliminar"
          />
        </button>
      </div>
      
      {/* Imagen de la tarjeta */}
      <img
        src={card.link}
        alt={card.name}
        className="elements__photo"
        onClick={handleImageClick}
      />
      
      {/* Footer con nombre y botón de like */}
      <div className="elements__footer">
        <p className="elements__footer-name">{card.name}</p>
        <button
          className={cardLikeButtonClassName}
          aria-label="Like card"
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
}