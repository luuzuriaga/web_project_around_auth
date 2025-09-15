import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Registrarse</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="auth__button" type="submit">Registrarse</button>
      </form>
      <p className="auth__link">
        ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;