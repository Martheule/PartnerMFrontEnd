import { useState, useEffect, useContext } from 'react'; // for loading screen
import { Outlet, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider, AuthContext } from '@/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from '@/components/UI/LoadingScreen'; // for loading screen

// Note Martha: AuthLayout - Without Navbar
const AuthLayout = () => {
  const [loading, setLoading] = useState(true); // start loading state
  const { user } = useContext(AuthContext) || {}; //Martha: get user out of contextloop
  const navigate = useNavigate(); // Martha: Redirect

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

    // Martha: Redirect if User not logged in.
  useEffect(() => {
    if (!loading && user === null) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

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
