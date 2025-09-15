import React, { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    
    // Llamar a la función del parent con los datos de la nueva tarjeta
    onAddPlaceSubmit({
      name,
      link
    });
    
    // Limpiar el formulario después del envío
    setName("");
    setLink("");
  }

  return (
    <form
      className="popup__form"
      id="add-card-form"
      name="card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_type_card-name"
          id="input-card-name"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="input-card-name-error"></span>
        <div className="popup__line"></div>
      </label>
      
      <label className="popup__field">
        <input
          name="link"
          type="url"
          className="popup__input popup__input_type_url"
          id="input-url"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="input-url-error"></span>
        <div className="popup__line"></div>
      </label>
      
      <button
        type="submit"
        className="popup__submit-button"
        id="button-create"
      >
        Crear
      </button>
    </form>
  );
}