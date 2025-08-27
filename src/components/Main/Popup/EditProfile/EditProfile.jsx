import { useState } from "react";
import { useCurrentUserContext } from "../../../../contexts/CurrentUserContext.jsx";

export default function EditProfile(props) {
  const { onClose } = props;
  const userContext = useCurrentUserContext();

  const [name, setName] = useState(userContext?.currentUser?.name || "");
  const [description, setDescription] = useState(
    userContext?.currentUser?.about || ""
  );

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const resp = await userContext?.handleUpdateUser({
      name,
      about: description,
    });
    if (!!resp) {
      console.log("salio bien!");
      onClose();
    } else {
      console.log("no salio bien!");
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_type_name"
          id="input-name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="input-name-error"></span>
        <div className="popup__line"></div>
      </label>
      <label className="popup__field">
        <input
          name="description"
          type="text"
          className="popup__input popup__input_type_description"
          id="input-description"
          placeholder="Acerca de mi"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="input-description-error"></span>
        <div className="popup__line"></div>
      </label>
      <button
        type="submit"
        className="button popup__submit-button"
        id="button-save"
      >
        Guardar
      </button>
    </form>
  );
}
