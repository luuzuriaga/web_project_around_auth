// utils/auth.js
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // Registrar usuario
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(this._checkResponse);
  }

  // Iniciar sesión
  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(this._checkResponse);
  }

  // Verificar token
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

const auth = new Auth('https://se-register-api.en.tripleten-services.com/v1');

export default auth;