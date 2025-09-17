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

function App() {
  // Estados principales
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();

  // Verificar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((response) => {
          // La API de TripleTen devuelve { data: { email, _id } }
          const userData = response.data || response;
          setLoggedIn(true);
          setCurrentUser(userData);
          api.setToken(token);
          loadInitialData();
        })
        .catch((error) => {
          console.error('Token inválido:', error);
          localStorage.removeItem('token');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos iniciales (usuario y tarjetas)
const loadInitialData = async () => {
  try {
    console.log('Cargando datos iniciales...'); // Debug
    const [userData, cardsData] = await Promise.all([
      api.getUserInformation(),
      api.getInitialCards()
    ]);
    
    console.log('Datos de usuario:', userData); // Debug
    console.log('Datos de tarjetas:', cardsData); // Debug
    console.log('Número de tarjetas:', cardsData?.length); // Debug
    
    setCurrentUser(userData);
    setCards(cardsData);
  } catch (error) {
    console.error('Error cargando datos iniciales:', error);
  } finally {
    setIsLoading(false);
  }
};

  // Manejar registro
  const handleRegister = async ({ email, password }) => {
    try {
      console.log('Intentando registrar:', { email }); // Debug
      const result = await auth.register(password, email);
      console.log('Registro exitoso:', result); // Debug
      
      // La API devuelve { data: { email, _id } } en caso de éxito
      if (result.data || result.email) {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        // Redirigir al login después de registro exitoso
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (error) {
      console.error('Error completo en registro:', error);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    }
  };

  // Manejar login
  const handleLogin = async ({ email, password }) => {
    try {
      console.log('Intentando login:', { email }); // Debug
      const data = await auth.login(password, email);
      console.log('Login response:', data); // Debug
      
      if (data.token) {
        console.log('TOKEN RECIBIDO:', data.token); // IMPORTANTE: ver el token completo
        console.log('LONGITUD DEL TOKEN:', data.token.length); // Ver si es un JWT válido
      

        localStorage.setItem('token', data.token);
        api.setToken(data.token);
        setLoggedIn(true);
        navigate('/');
        loadInitialData();
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error) {
      console.error('Error completo en login:', error);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    }
  };

  // Manejar logout
  const handleSignOut = () => {
    localStorage.removeItem('token');
    api.removeToken();
    setLoggedIn(false);
    setCurrentUser(null);
    setCards([]);
    navigate('/signin');
  };

  // Manejar apertura de popup
  const handleOpenPopup = (popupConfig) => {
    setPopup(popupConfig);
  };

  // Manejar cierre de popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  // Manejar like de tarjeta
  const handleCardLike = async (card) => {
    try {
      const isLiked = card.isLiked;
      const newCard = await api.like(card._id, !isLiked);
      
      setCards((prevCards) =>
        prevCards.map((c) => (c._id === card._id ? newCard : c))
      );
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  // Manejar eliminación de tarjeta
  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
    }
  };

  // Manejar agregar nueva tarjeta
  const handleAddPlaceSubmit = async (cardData) => {
    try {
      const newCard = await api.createCard(cardData);
      setCards((prevCards) => [newCard, ...prevCards]);
      handleClosePopup();
    } catch (error) {
      console.error('Error al crear tarjeta:', error);
    }
  };

  // Actualizar usuario desde context
  const handleUpdateUser = (userData) => {
    setCurrentUser(userData);
  };

  if (isLoading) {
    return (
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <CurrentUserProvider currentUser={currentUser} onUpdateUser={handleUpdateUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          userEmail={currentUser?.email} 
          onSignOut={handleSignOut} 
        />
        
        <Routes>
          <Route 
            path="/signin" 
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            } 
          />
          
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
          
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/signin"} replace />} />
        </Routes>

        <Footer />

        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={() => setIsInfoTooltipOpen(false)}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserProvider>
  );
}

export default App;