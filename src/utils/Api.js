// utils/Api.js
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Añadir método para establecer token JWT dinámico
  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
    console.log('Token JWT establecido:', token.substring(0, 20) + '...'); // Debug (solo primeros 20 chars)
    console.log('Headers actualizados:', this._headers); // Debug
  }

  // Eliminar token (para logout)
  removeToken() {
    delete this._headers.authorization;
    console.log('Token eliminado'); // Debug
  }

  // Obtener información del usuario
  getUserInformation() {
    console.log('Petición getUserInformation a:', `${this._baseUrl}/users/me`); // Debug
    console.log('Con headers:', this._headers); // Debug
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getUserInformation:', res.status); // Debug
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Datos usuario recibidos:', data); // Debug
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
    console.log('Petición getInitialCards a:', `${this._baseUrl}/cards`); // Debug
    
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getInitialCards:', res.status); // Debug
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Tarjetas recibidas:', data); // Debug
      console.log('Número de tarjetas:', data?.length); // Debug
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


const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
    
  },
});

export default api;