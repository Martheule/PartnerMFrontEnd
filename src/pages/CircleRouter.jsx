import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import CirclePage from "./CirclePage";
import CreateCirclePage from "./CreateCirclePage";

const CircleRouter = () => {
  const [loading, setLoading] = useState(true);
  const [circleData, setCircleData] = useState(null);
  const [visible, setVisible] = useState(false); // NEW Martha: Fade-In state
  const { token } = useContext(AuthContext); // Note Martha: token aus Context

  useEffect(() => {
    async function fetchCircleStatus() {
      try {
        if (!token) return; // Note Martha: kein Token → kein fetch
        const res = await fetch("/circle/my-circle", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = await res.json();
        setCircleData(data);
      } catch (err) {
        console.error("Error fetching circle status:", err);
        setCircleData(null);
      } finally {
        setLoading(false); // Note Martha: loading beenden
      }
    }
    fetchCircleStatus();
  }, [token]);

  // NEW Martha: Fade-In beim Mount
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setVisible(true), 50); // kurzer Delay
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Note Martha: Loading Overlay transparent
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
        <span className="loading loading-spinner loading-lg text-black"></span>
      </div>
    );
  }

  // Note Martha: Entscheide welche Seite gerendert wird
  const RenderedPage = circleData?.isInCircle ? CirclePage : CreateCirclePage;

  return (
    <div
      className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <RenderedPage circle={circleData} />
    </div>
  );
};

export default CircleRouter;
