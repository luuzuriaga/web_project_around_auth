import logo from "../../../images/logo.png";
import { Link } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo Titulo" className="header__image" />
      <img src="./images/Line.png" alt="Linea" className="header__image-line" />
      
      {loggedIn ? (
        <div className="header__auth">
          <span className="header__email">{userEmail}</span>
          <button className="header__logout" onClick={onSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <nav className="header__nav">
          <Link to="/signup" className="header__link">Registrarse</Link>
          <Link to="/signin" className="header__link">Iniciar sesión</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;