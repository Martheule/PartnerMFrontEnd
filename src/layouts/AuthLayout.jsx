import { useState, useEffect } from 'react'; // for loading screen
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from '@/components/UI/LoadingScreen'; // for loading screen

// Note Martha: AuthLayout - ohne Navbar
const AuthLayout = () => {
  const [loading, setLoading] = useState(true); // start loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AuthContextProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#edffbe] to-[#6ccf8a] p-[4%] flex-col gap-6 transition-opacity duration-1000 $ text-black">
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          theme="colored"
        />
        {/* keine Navbar */}
        <main className="flex-1 w-full px-4 py-8 max-w-screen-xl mx-auto">
          <Outlet />
        </main>
      </div>
    </AuthContextProvider>
  );
};

export default AuthLayout;
