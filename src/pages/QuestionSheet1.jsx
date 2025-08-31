import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { fetchNextQuestion, submitAnswer } from "@/config/dailyScoreApi";

const QuestionSheet1 = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = async () => {
    try {
      setLoading(true);
      const q = await fetchNextQuestion(token);
      setQuestion(q);
      setSelectedChoice(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (choiceId) => {
    setSelectedChoice(choiceId);
    try {
      await submitAnswer(token, { questionId: question.id, choiceId });
      navigate("/QuestionSheet2");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!question) return <p>Keine Frage verfügbar</p>;

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-xl font-bold">{question.text}</h2>
      <div className="flex flex-col gap-4">
        {question.choices.map((c) => (
          <button
            key={c.id}
            onClick={() => handleAnswer(c.id)}
            className="flex items-center gap-3 p-3 border rounded-full hover:bg-gray-100 transition"
          >
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                selectedChoice === c.id ? "bg-green-500 text-white" : ""
              }`}
            >
              {selectedChoice === c.id ? "✓" : ""}
            </div>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSheet1;
