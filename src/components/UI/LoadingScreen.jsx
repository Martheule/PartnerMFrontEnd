import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';
import { signOut } from '@/data/auth';

// Note from Martha: Responsive full-screen loading with centered animation
const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#202020]">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
};

export default LoadingScreen;