import React, { useRef, useContext } from "react";
import { useCurrentUserContext } from "../../../../contexts/CurrentUserContext.jsx";

export default function EditAvatar(props) {
  const { onClose } = props;
  const userContext = useCurrentUserContext();
  const avatarInputRef = useRef();

  async function handleSubmit(evt) {
    evt.preventDefault();

    const avatar = avatarInputRef.current.value;
    const resp = await userContext?.handleUpdateAvatar({
      avatar,
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
      id="change-avatar-form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarInputRef}
          name="link"
          id="url-photo"
          className="popup__input popup__input_type_about"
          placeholder="Enlace a la imagen"
          required
          type="url"
        />
        <span className="popup__error" id="input-url-error"></span>
        <div className="popup__line"></div>
      </label>
      <button
        id="Button-SaveProfile"
        type="submit"
        className="popup__submit-button"
      >
        Guardar
      </button>
    </form>
  );
}
