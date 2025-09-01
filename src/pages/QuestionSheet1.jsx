import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
import { AuthContext } from "@/context/AuthContext";
import UserTopBar from "@/components/UI/UserHeader";

const API_BASE = "http://localhost:4321"; // ✅ Added: full backend URL

const QuestionSheet1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuestion = location.state?.question; // passed from FindYourMood
  const [question, setQuestion] = useState(initialQuestion || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If no question passed, fetch the first question
  useEffect(() => {
    if (!question) {
      fetchNextQuestion();
    }
  }, []);

  const fetchNextQuestion = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/daily-score/next-question`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Added: check content type to prevent HTML parse errors
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error("Server returned non-JSON response: " + text);
      }

      if (res.ok) {
        setQuestion(data);
      } else {
        setError(data.message || "Failed to load question.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (choiceId) => {
    if (!question) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/daily-score/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          choiceId,
        }),
      });

      // ✅ Added: same content-type check
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error("Server returned non-JSON response: " + text);
      }

      if (res.ok) {
        // Fetch the next question after submitting
        fetchNextQuestion();
      } else {
        setError(data.message || "Failed to submit answer.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !question) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!question) return <p>No question available.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <UserTopBar />
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col items-center gap-6 max-w-md w-full">
        <h2 className="text-xl font-bold">{question.text}</h2>
        <div className="flex flex-col gap-4 w-full">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              className="btn btn-primary w-full"
              onClick={() => handleAnswer(choice.id)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionSheet1;
