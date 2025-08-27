import { useState } from "react";
import api from "../../../../utils/api";

export default function NewCard({ onAddPlaceSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlaceSubmit({ name: title, link: link });
  }

  return (
    <form
      className="popup__form"
      id="add-place-form"
      name="card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="title"
          type="text"
          className="popup__input popup__input_type_name"
          id="input-title"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="popup__error" id="input-title-error"></span>
        <div className="popup__line"></div>
      </label>
      <label className="popup__field">
        <input
          name="link"
          id="input-url"
          className="popup__input popup__input_type_about"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__error" id="input-url-error"></span>
        <div className="popup__line"></div>
      </label>
      <button
        id="btn_create_card"
        type="submit"
        className="popup__submit-button"
      >
        Crear
      </button>
    </form>
  );
}
