// src/config/circleApi.js
const API_URL = import.meta.env.VITE_API_URL + "/circle";

// Create a circle
export const createCircle = async (token, circleName) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ circleName }),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Erstellen des Kreises");
  }

  return await res.json(); // circle object from backend
};

// Get current circle (optional, e.g. to check membership)
export const getMyCircle = async (token) => {
  const res = await fetch(`${API_URL}/my-circle`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Fehler beim Laden des Kreises");
  }

  return await res.json();
};
