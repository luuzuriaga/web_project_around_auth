import pincelButton from "../../../images/Lapiz Editar.png";
import { useEffect } from "react";
import NewCard from "./Popup/NewCard/NewCard.jsx";
import EditAvatar from "./Popup/EditAvatar/EditAvatar.jsx";
import EditProfile from "./Popup/EditProfile/EditProfile.jsx";
import Popup from "./Popup/Popup.jsx";
import Card from "../Cards/Cards.jsx";
import ImagePopup from "./Popup/ImagePopup/ImagePopup.jsx";
import RemoveCard from "./Popup/RemoveCard/RemoveCard.jsx";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function Main(props) {
  const {
    onOpenPopup,
    onClosePopup,
    popup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlaceSubmit,
  } = props;

  const userContext = useCurrentUserContext();

  // Configuraciones de los popups
  const newCardPopup = {
    title: "Nuevo lugar",
    Children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    Children: <EditAvatar onClose={onClosePopup} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    Children: <EditProfile onClose={onClosePopup} />,
  };

  const removeCardPopup = {
    type: "removeCard",
    title: "¿Estás seguro?",
  };

  return (
    <main className="content">
      {/* Sección del perfil */}
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <img
              src={userContext?.currentUser?.avatar || "https://via.placeholder.com/120"}
              alt="Foto Avatar"
              className="profile__avatar"
            />
            <button
              className="profile__avatar-button"
              type="button"
              aria-label="Edit Avatar"
              onClick={() => onOpenPopup(editAvatarPopup)}
            >
              <img
                src={pincelButton}
                alt="Editar foto"
                className="profile__avatar-edit"
              />
            </button>
          </div>
          
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__header-title">
                {userContext?.isLoadingUser
                  ? "Cargando..."
                  : userContext?.currentUser?.name || "Usuario"}
              </h1>
              <button
                aria-label="Edit Profile"
                type="button"
                className="profile__header-button"
                onClick={() => onOpenPopup(editProfilePopup)}
              ></button>
            </div>
            <p className="profile__description">
              {userContext?.isLoadingUser
                ? "Cargando..."
                : userContext?.currentUser?.about || "Explorador"}
            </p>
          </div>
        </div>
        
        <button
          aria-label="Add card"
          className="profile__button-add"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>

      {/* Manejo de todos los popups */}
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.type === 'removeCard' ? (
            <RemoveCard 
              onConfirm={() => {
                onCardDelete(popup.cardToDelete);
                onClosePopup();
              }}
            />
          ) : popup.card ? (
            <ImagePopup 
              card={popup.card} 
              onClose={onClosePopup}
              isOpen={true}
            />
          ) : (
            popup.Children
          )}
        </Popup>
      )}

      {/* Sección de tarjetas */}
      <section className="elements">
        <div className="elements__grid">
          {cards.map((cardElm) => (
            <Card
              key={cardElm._id}
              card={cardElm}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              isLiked={cardElm?.isLiked}
              onCardDelete={(card) => onOpenPopup({
                ...removeCardPopup,
                cardToDelete: card
              })}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;