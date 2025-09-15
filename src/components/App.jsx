import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from "../components/Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import { CurrentUserProvider } from "../contexts/CurrentUserContext.jsx";
import api from "../utils/Api.js";
import auth from "../utils/auth.js";

// Componente principal que usa el Router
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // Para el contexto
  const navigate = useNavigate();

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Configurar el token en la API
      api.setToken(token);
      
      // Verificar si el token es válido
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          // Obtener información completa del usuario
          return api.getUserInformation();
        })
        .then((userData) => {
          setCurrentUser(userData);
          navigate('/');
        })
        .catch((err) => {
          console.log('Token inválido:', err);
          localStorage.removeItem('jwt');
          api.removeToken();
          navigate('/signup');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      navigate('/signup');
    }
  }, [navigate]);

  // Cargar tarjetas cuando se autentique
  useEffect(() => {
    if (loggedIn && currentUser) {
      api.getInitialCards()
        .then((cardsData) => {
          // Procesar las tarjetas para determinar si están liked
          const processedCards = cardsData.map(card => ({
            ...card,
            isLiked: card.likes && card.likes.some(like => like._id === currentUser._id)
          }));
          setCards(processedCards);
        })
        .catch(console.error);
    }
  }, [loggedIn, currentUser]);

  const handleLogin = (formData) => {
    auth.login(formData.password, formData.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setToken(data.token);
          setLoggedIn(true);
          setUserEmail(formData.email);
          // Obtener información del usuario después del login
          return api.getUserInformation();
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('Error en login:', err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = (formData) => {
    auth.register(formData.password, formData.email)
      .then((data) => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.log('Error en registro:', err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    api.removeToken();
    setLoggedIn(false);
    setUserEmail('');
    setCurrentUser(null);
    setCards([]);
    navigate('/signup');
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    api.like(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? {
          ...newCard,
          isLiked: !isLiked
        } : c));
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        handleClosePopup();
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = (cardData) => {
    api.createCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch(console.error);
  };

  const handleOpenPopup = (popupConfig) => {
    setPopup(popupConfig);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleCloseInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  // Función para actualizar el usuario desde el contexto
  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <CurrentUserProvider currentUser={currentUser} onUpdateUser={handleUpdateUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          userEmail={userEmail} 
          onSignOut={handleSignOut} 
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute 
                loggedIn={loggedIn} 
                component={Main}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
            } 
          />
          <Route 
            path="/signin" 
            element={
              loggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              loggedIn ? <Navigate to="/" replace /> : <Register onRegister={handleRegister} />
            } 
          />
          <Route 
            path="*" 
            element={<Navigate to={loggedIn ? "/" : "/signup"} replace />} 
          />
        </Routes>
        
        <Footer />
        
        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseInfoTooltip}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserProvider>
  );
}

export default App;