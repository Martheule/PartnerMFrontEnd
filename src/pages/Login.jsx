import { useState, useContext, useEffect } from 'react'; // Note Martha: useEffect hinzugefügt für Fade
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';
import { signIn } from "@/data/auth";

// Note Martha: useState hook initializes the email and password fields
// Note Martha: + loading state to manage the loading status during the login process.
const Login = () => {
  const [{ email, password }, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false); // NEW: für Fade-In/Fade-Out
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

// Note Martha: function updates the state for the email and password fields.
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

// Note Martha: function handles form submission. 
// Note Martha: Errors and displays appropriate messages using toast.
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error('All fields are required');
      setLoading(true);

      // NEW: Fade-Out before navigate
      setVisible(false); 
      setTimeout(async () => {
        const user = await signIn({ email, password });
        setUser(user);
        toast.success('Welcome back!');
        // Note Martha: nach Login weiterleiten
        navigate('/after-login');
      }, 500); // Dauer des Fade-Outs = 500ms
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

// NEW: Fade-In beim Mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50); // kurzer Delay für Übergang
    return () => clearTimeout(timer);
  }, []);

  return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-[#edffbe] to-[#6ccf8a] p-[4%] fixed inset-0
                    transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} // NEW: Fade-In/Fade-Out
      >
    <form
      className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl flex flex-col gap-4 text-white"
      onSubmit={handleSubmit}
    >

        <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold text-black">Welcome Back!</h1>
              <p className="text-black/80">Sign in to your account</p>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
  {/* Email */}
  <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
    >
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg>
    <input
      name="email"
      value={email}
      onChange={handleChange}
      type="email"
      className="grow"
      placeholder="Email"
    />
  </label>

  {/* Passwort */}
  <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
    >
      <path
        fillRule="evenodd"
        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
        clipRule="evenodd"
      />
    </svg>
    <input
      name="password"
      value={password}
      onChange={handleChange}
      type="password"
      className="grow"
      placeholder="Password"
    />
  </label>

  {/* Register Text */}
  <small className="text-center">
    Don&apos;t have an account?{' '}
    <Link to="/register" className="text-primary hover:underline">
      Join us!
    </Link>
  </small>
</div>

      <button className='btn btn-primary self-center' disabled={loading}>
        Login
      </button>
    </form>
  </div>
    ); 
};

export default Login;
