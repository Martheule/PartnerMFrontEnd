import { useNavigate } from "react-router-dom";
import UserTopBar from "@/components/UI/UserHeader";

const CreateCirclePage = () => {
  const navigate = useNavigate();

  const handleCreateCircleClick = () => {
    // Note Martha: Navigate to AfterLoginCreate
    navigate("/AfterLoginCreate");
  };

  const handleInviteFriendClick = () => {
    // Note Martha: Navigate to Invite a Friend
    navigate("/InviteFriend");
  };
  

  return (
    <>
        <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-5">
      <UserTopBar />

    <div className="flex flex-col items-center justify-center h-screen bg-transparent from-[#edffbe] to-[#6ccf8a] p-5">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-black mb-4">Welcome!</h1>
      <p className="text-black/70 mb-6">Ready to get started?</p>
      <div className="flex flex-col gap-4">
        <button onClick={handleCreateCircleClick} className="btn btn-primary">
          Create a Circle
        </button>
        <button onClick={handleInviteFriendClick} className="btn btn-secondary">
          Invite a Friend
        </button>
      </div></div>
    </div></div>
    </>
  );
};

export default CreateCirclePage;
