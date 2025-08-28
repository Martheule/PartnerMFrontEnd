import UserTopBar from "@/components/UI/UserHeader";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { BASE_URL } from "@/config/api";

const AfterLoginCreate = () => {
  const [circleName, setCircleName] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // NEW FUNCTIONALITY: Create Circle and go to FindYourMood
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        //Note from Martha: Centralized URL in API
      const createCircle = async () => {
        const res = await fetch(`${BASE_URL}/circle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ circleName }),
        });
        const data = await res.json();
        console.log(data);
      };

      // Nach erfolgreichem Erstellen zur FindYourMood-Seite navigieren
      // NEW FUNCTIONALITY
      navigate("/FindYourMood", { state: { circleId: data.id } }); 
      // circleId wird weitergegeben, um die Antworten später zu speichern

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-5">
      <UserTopBar />

      <div className="flex items-center justify-center h-screen bg-transparent p-5 mt-16">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
          {/* Note Martha: Username im Header */}
          <header className="mb-6 text-center">
            <h2 className="text-xl font-bold text-black">
              Welcome, {user?.displayName || user?.email || "User"}!
            </h2>
            <p className="text-black/70">Let’s create your first circle 🚀</p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col gap-4"
          >
            <h1 className="text-2xl font-bold text-black">Create a Circle</h1>
            <input
              type="text"
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              placeholder="Circle Name"
              className="input input-bordered w-full text-white"
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AfterLoginCreate;
