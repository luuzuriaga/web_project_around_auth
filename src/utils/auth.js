// utils/auth.js
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // Registrar usuario
  register(password, email) {
    console.log('Auth.register llamado con:', { email, passwordLength: password?.length });
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then((res) => {
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      return this._checkResponse(res);
    })
    .catch((error) => {
      console.error('Error en fetch de register:', error);
      throw error;
    });
  }

  // Iniciar sesión
  login(password, email) {
    console.log('Auth.login llamado con:', { email, passwordLength: password?.length });
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then((res) => {
      console.log('Login response status:', res.status);
      return this._checkResponse(res);
    })
    .catch((error) => {
      console.error('Error en fetch de login:', error);
      throw error;
    });
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

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    
    // Intentar obtener el mensaje de error del servidor
    let errorMessage = `Error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // Si no se puede parsear el JSON del error, usar el mensaje por defecto
    }
    
    console.error('Error response:', errorMessage);
    return Promise.reject(errorMessage);
  }
}

const auth = new Auth('https://se-register-api.en.tripleten-services.com/v1');

export default auth;