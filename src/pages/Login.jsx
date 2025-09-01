import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';

// Note Martha: Login.jsx nutzt jetzt login aus Context
const Login = () => {
  const [{ email, password }, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false); // Martha: Fade-In
  const { login } = useContext(AuthContext); // Martha: login function aus Context
  const [shake, setShake] = useState(false); // shake effekt bei falschem pw
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

   /*  try {
      setLoading(true);
      setVisible(false); // Martha: Fade-Out
      setTimeout(async () => {
        const success = await login({ email, password });
        if (success) {
          toast.success('Welcome back!');
          navigate('/circle'); // Martha: CircleRouter weiterleiten
        } else {
          toast.error('Invalid credentials');
        }
      }, 300); // Martha: Fade-Out Zeit
    } catch (err) {
      toast.error(err.message || 'Login failed');
      setShake(true);
    setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    } */

    try {
      setLoading(true);
      // Remove setVisible(false) from here
      
      const success = await login({ email, password });
      
      if (success) {
        setVisible(false); // Only fade out on success
        setTimeout(() => {
          toast.success('Welcome back!');
          navigate('/circle');
        }, 300);
      } else {
        toast.error('Invalid credentials');
        setShake(true); // Add shake for wrong password
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
      setShake(true);
      setTimeout(() => setShake(false), 500); // Fix missing braces
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50); // Fade-In
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-[#edffbe] to-[#6ccf8a] p-[4%] fixed inset-0
                  transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <form
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl flex flex-col gap-4 text-white ${shake ? 'shake' : ''}"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-black">Welcome Back!</h1>
          <p className="text-black/80">Sign in to your account</p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
            <input
              name="email"
              value={email}
              onChange={handleChange}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
            <input
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>

          <small className="text-center text-black/70">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Join us!
            </Link>
          </small>
        </div>

        <button className="btn btn-primary self-center" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;