import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CirclePage = () => {
  const [circle, setCircle] = useState(null);

  useEffect(() => {
    // TODO: hier später fetch auf /circle/my-circle einbauen
    // fürs Erste nur Dummy
    setCircle({ circleName: "Test Circle" });
  }, []);

  if (!circle) {
    return <div className="p-4">Loading...</div>;
  }

 // Note Martha: User aus Context holen
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#edffbe] to-[#6ccf8a]">
      <h1 className="text-3xl font-bold text-black">
        Welcome to {circle.circleName} 🎉
      </h1>
    </div>
  );
};

export default CirclePage;
