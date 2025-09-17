// utils/errorHandler.js

export const getErrorMessage = (error, defaultMessage = 'Ha ocurrido un error') => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  // Manejo específico para errores de la API de TripleTen
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Los datos proporcionados son incorrectos';
      case 401:
        return 'Credenciales inválidas';
      case 403:
        return 'No tienes permisos para realizar esta acción';
      case 404:
        return 'El recurso solicitado no fue encontrado';
      case 500:
        return 'Error interno del servidor';
      default:
        return defaultMessage;
    }
  }
  
  return defaultMessage;
};

export const logError = (error, context = '') => {
  console.error(`Error ${context}:`, error);
  
};