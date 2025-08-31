const API_URL = "http://localhost:5173/daily-score"; // Backend URL anpassen

// nächste Frage holen
export const fetchNextQuestion = async (token) => {
  const res = await fetch(`${API_URL}/next-question`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Fehler beim Laden der Frage");
  }

  const data = await res.json();
  return data; // { id, text, choices: [{ id, label }] }
};

// Antwort absenden
export const submitAnswer = async (token, { questionId, choiceId }) => {
  const res = await fetch(`${API_URL}/answer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, choiceId }),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Speichern der Antwort");
  }

  const data = await res.json();
  return data;
};
