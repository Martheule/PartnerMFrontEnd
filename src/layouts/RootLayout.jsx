import { useState, useEffect } from 'react'; // for loading screen
import { Navbar } from '@/components';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from '@/components/UI/LoadingScreen'; // for loading screen


// Note Martha:  RootLayout - a function that returns JSX.
const RootLayout = () => {

const [loading, setLoading] = useState(true); // here starting hook loading screen

  // Note from Martha: Simulate initial loading screen for 5 seconds. DaisyUISPinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Note from Martha: Show responsive icon before rendering app
  if (loading) return <LoadingScreen />;

// Note Martha:  Navbarlayout
  return (
    <AuthContextProvider>
      <div className='min-h-screen bg-gradient-to-t from-black to-[#202020] text-white'>
        <ToastContainer
          position='bottom-left'
          autoClose={1500}
          theme='colored'
        />
        <Navbar />
        <main className="flex-1 w-full px-4 py-8 max-w-screen-xl mx-auto">
        </main>
        <Outlet />
      </div>
    </AuthContextProvider>
  );

};

export default RootLayout;