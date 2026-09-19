const TOKEN_KEY = 'adith_admin_token';
const ADMIN_KEY = 'adith_admin_user';
export const API_BASE = 'http://localhost:5000/api';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  if (user) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
  }
};

export const clearAdminAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token);
};

export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAdminAuth();
  }

  return response;
};
