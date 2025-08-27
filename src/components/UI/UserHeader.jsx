import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const UserHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-md z-50 p-4 flex justify-center shadow-sm">
      <span className="text-black font-semibold">
        {user?.displayName || user?.email || "User"}
      </span>
    </header>
  );
};

export default UserHeader;
