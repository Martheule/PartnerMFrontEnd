// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

export const BASE_URL = API_URL;

export const API = {
  AUTH: `${BASE_URL}/auth`,
  CIRCLE: `${BASE_URL}/circle`,
  USER: `${BASE_URL}/user`,
};