import { createContext, useContext, useState, useEffect } from "react";
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

const CurrentUserProvider = ({ children, currentUser: initialUser, onUpdateUser }) => {
  const [currentUser, setCurrentUser] = useState(initialUser || {});
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // Sincronizar con el usuario del App component
  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
  }, [initialUser]);

  const handleGetUser = async () => {
    return new Promise((resolve, reject) => {
      setIsLoadingUser(true);
      api
        .getUserInformation()
        .then((data) => {
          setCurrentUser(data);
          if (onUpdateUser) {
            onUpdateUser(data);
          }
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
      setIsLoadingUser(true);
      api
        .updateUserProfile(userInfo)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          if (onUpdateUser) {
            onUpdateUser(updatedUser);
          }
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
      setIsLoadingUser(true);
      api
        .updateProfilePhoto(avatar)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          if (onUpdateUser) {
            onUpdateUser(updatedUser);
          }
          setIsLoadingUser(false);
          resolve(true);
        })
        .catch((error) => {
          console.error("Error al actualizar el avatar:", error);
          setIsLoadingUser(false);
          resolve(false);
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