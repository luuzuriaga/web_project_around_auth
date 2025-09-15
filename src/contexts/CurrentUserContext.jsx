import { createContext, useContext, useState } from "react";
import api from "../utils/Api";
import React from "react";

const CurrentUserContext = createContext();

function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within an CurrentUserProvider"
    );
  }
  return context;
}
const CurrentUserProvider = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const handleGetUser = async () => {
    return new Promise((resolve, reject) => {
      api
        .getUserInformation()
        .then((data) => {
          setCurrentUser(data);
          setIsLoadingUser(false);
          resolve(true);
        })
        .catch((error) => {
          console.error("Error al obtener la información del usuario:", error);
          setIsLoadingUser(false);
          resolve(false);
        });
    });
  };

  const handleUpdateUser = async (userInfo) => {
    return new Promise((resolve, reject) => {
      api
        .updateUserProfile(userInfo)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          setIsLoadingUser(false);
          resolve(true);
        })
        .catch((error) => {
          console.error("Error al editar la información del usuario:", error);
          setIsLoadingUser(false);
          resolve(false);
        });
    });
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    return new Promise((resolve, reject) => {
      api
        .updateProfilePhoto(avatar)
        .then((updatedAvatar) => {
          setCurrentUser(updatedAvatar);
          resolve(true);
        })
        .catch((error) => {
          console.error("Error al actualizar el avatar:", error);
          resolve(error);
        });
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        isLoadingUser,
        currentUser,
        handleGetUser,
        handleUpdateAvatar,
        handleUpdateUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
export { CurrentUserProvider, useCurrentUserContext };
