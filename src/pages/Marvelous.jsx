import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState('fade-in'); // Note Martha: für Fade-In/Out
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setFade('fade-out'); // Note Martha: starte Fade-Out
      setShowLoading(true);
      const t2 = setTimeout(() => {
        navigate('/login'); // nach weiteren 2s: weiter zu Login
      }, 2000);
      return () => clearTimeout(t2);
    }, 6000); // 6 Sekunden Welcome

    return () => clearTimeout(welcomeTimer);
  }, [navigate]);

  if (showLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-t from-black to-[#202020] text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#6db783] to-[#94F7B2] text-white gap-6 transition-opacity duration-1000 ${
        fade === 'fade-in' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-4xl font-bold text-black">Welcome!</h1>
       <br></br>
             {/* Rundes Logo Platzhalter */}
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
        <span className="text-black font-bold">Logo</span>
      </div>
    </div>
  );
};

export default Marvelous;
