import UserTopBar from "@/components/UI/UserHeader";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const InvitationScreen = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Wir nehmen an, dass die Circle-ID oder Daten per State oder Query übergeben werden
  const invitedCircle = location.state?.circle; // { id, name }

  const handleJoinCircleClick = () => {
    if (!invitedCircle) {
      alert("Circle not found!");
      return;
    }
    // Weiterleitung auf FindYourMood mit Circle info
    navigate("/FindYourMood", { state: { circle: invitedCircle } });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-5 bg-transparent">
      <UserTopBar />

      <div className="flex items-center justify-center h-screen p-5 mt-16 w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col items-center gap-6 w-full">
          <header className="mb-6 text-center">
            <h2 className="text-xl font-bold text-black">
              Welcome, {user?.displayName || user?.email || "User"}!
            </h2>
            <p className="text-black/70">
              You’ve been invited to join the circle:{" "}
              <span className="font-semibold text-black">
                {invitedCircle?.name || "Unknown Circle"}
              </span>
            </p>
          </header>

          <button
            onClick={handleJoinCircleClick}
            className="btn btn-primary mt-4 w-full"
          >
            Join Circle & Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
