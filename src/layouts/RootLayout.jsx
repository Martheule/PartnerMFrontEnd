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
      <div className='container mx-auto'>
        <ToastContainer
          position='bottom-left'
          autoClose={1500}
          theme='colored'
        />
        <Navbar />
        <main className='container mx-auto px-4 py-8'></main>
        <Outlet />
      </div>
    </AuthContextProvider>
  );

};

export default RootLayout;