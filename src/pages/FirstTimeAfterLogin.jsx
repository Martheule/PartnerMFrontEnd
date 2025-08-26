import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstTimeAfterLogin = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false); // Note Martha: für Fade-In/Fade-Out
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Note Martha: Fade-In beim Mount
    const fadeInTimer = setTimeout(() => setVisible(true), 20);

    // Note Martha: nach 6 Sekunden Fade-Out starten
    const welcomeTimer = setTimeout(() => {
      setVisible(false); // Note Martha: starte Fade-Out
      setShowLoading(true); 
      const t2 = setTimeout(() => {
        navigate('/login'); // Note Martha: nach weiteren 0.2s weiter zu Login
      }, 500); // Dauer entspricht Login Fade-Out
      return () => clearTimeout(t2);
    }, 6000); // 6 Sekunden Welcome

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(welcomeTimer);
    };
  }, [navigate]);

  if (showLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#edffbe] to-[#6ccf8a] text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#edffbe] to-[#6ccf8a] text-white gap-6 p-[4%] transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`} // Note Martha: Fade-In/Fade-Out
    >
      {/* User Name */}
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
        <span className="text-black font-bold">Hier dein user NAme</span>
      </div>
      <br></br>
      <h1 className="text-4xl font-bold text-black">Welcome!</h1>
      <p className="text-black/80">Hier kommt ein Button hin.</p>
            <p className="text-black/80">Hier kommt ein Button hin.</p>
    </div>
  );
};

export default FirstTimeAfterLogin;
