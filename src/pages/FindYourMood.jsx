import UserTopBar from "@/components/UI/UserHeader";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const FindYourMood = () => {
  const navigate = useNavigate();

//  const handleStartMoodIdentify = () => {
//    navigate("/MoodIdentify"); // Navigiert zum Rage-Katalog
//  };

const handleCreateCircleClick = () => {
  navigate("/MoodIdentify");
};

  return (
    <>
        <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-5">
      <UserTopBar />

    <div className="flex flex-col items-center justify-center h-screen bg-transparent from-[#edffbe] to-[#6ccf8a] p-5">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-black mb-4">So...</h1>
      <p className="text-black/70 mb-6">What's it gonna be? How do you feel?</p>
      <div className="flex flex-col gap-4">
        <button onClick={handleCreateCircleClick} className="btn btn-primary">
          Find Your Mood
        </button>

      </div></div>
    </div></div>
    </>
  );
};

export default FindYourMood;
