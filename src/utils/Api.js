// utils/api.js
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Añadir método para establecer token
  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  // Eliminar token (para logout)
  removeToken() {
    delete this._headers.authorization;
  }

  // Obtener información del usuario
  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // La API de TripleTen devuelve { data: { email, _id } }
      // pero necesitamos mantener compatibilidad con el frontend
      if (data.data) {
        return {
          email: data.data.email,
          _id: data.data._id,
          name: data.data.name || 'Usuario', // valor por defecto
          about: data.data.about || 'Explorador', // valor por defecto
          avatar: data.data.avatar || 'https://via.placeholder.com/120'
        };
      }
      return data;
    });
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Procesar las tarjetas para añadir la propiedad isLiked
      if (Array.isArray(data)) {
        return data.map(card => ({
          ...card,
          isLiked: card.likes && card.likes.length > 0 // Ajustar según la estructura de la API
        }));
      }
      return data;
    });
  }

  // Actualizar perfil de usuario
  updateUserProfile(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Procesar respuesta si viene envuelta en data
      return data.data || data;
    });
  }

  // Crear nueva tarjeta
  createCard(body) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Añadir isLiked a la nueva tarjeta
      const card = data.data || data;
      return {
        ...card,
        isLiked: false
      };
    });
  }

  // Like/Dislike de tarjeta
  like(id, like) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const card = data.data || data;
      return {
        ...card,
        isLiked: like
      };
    });
  }

  // Eliminar tarjeta
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  // Actualizar foto de perfil
  updateProfilePhoto(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Procesar respuesta si viene envuelta en data
      return data.data || data;
    });
  }
}

// Cambiar a la URL base de TripleTen
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;