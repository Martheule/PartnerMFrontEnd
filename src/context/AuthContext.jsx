import { createContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, me } from '@/data/auth';
import Login from "@/pages/Login"; // fallback to
import LoadingScreen from "@/components/UI/LoadingScreen"; 

// Note Martha: Create a context for authentication.
const AuthContext = createContext();

// Note Martha: Initialize user state. define context.
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Martha: holds the JWT token
  const [loading, setLoading] = useState(true); 

useEffect(() => {
  const checkSession = async () => {
    try {
      // Check if we have a stored token
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        // We have a token, so assume user is logged in
        // You can either:
        // A) Set a basic user object (if you don't need full user data)
        // B) Call me() with the token to get fresh user data
        
        // Option A (simplest):
        setUser({ isAuthenticated: true }); // Placeholder user object
        
        // Option B (if you want fresh user data):
        // const data = await me(storedToken); // Pass the token!
        // setUser(data?.user || null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Session check failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  checkSession();
}, []);

  /* // Note Martha: Function to fetch user data with me() and update user Data. Session check on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await me();
        setUser(data?.user || null);
      } catch (err) {
        console.warn("Invalid session", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);
 */
  // login: returns true on success, false on failure
  const login = async (credentials) => {
  try {
    const result = await signIn(credentials);

    // Case A: signIn returns { ok, status, data }
    if (result && typeof result === 'object' && 'ok' in result) {
      if (!result.ok) return false;
      const payload = result.data ?? result;
      if (payload?.user) setUser(payload.user);
      if (payload?.token) {
        setToken(payload.token);
        localStorage.setItem('token', payload.token);
      }
      return true;
    }

    // Case B: fallback for older style
    if (result) {
      const payload = result;
      if (payload?.user || Object.keys(payload).length) {
        if (payload.user) setUser(payload.user);
        if (payload?.token) {
          setToken(payload.token);
          localStorage.setItem('token', payload.token);
        }
        return true;
      }
    }

    return false;
  } catch (err) {
    console.warn('login failed (caught):', err);
    return false;
  }
};


  // register (👈 move this ABOVE values so it's defined)
  const register = async ({ email, password }) => {
    try {
      const data = await signUp({ email, password });
      if (data?.user) {
        setUser(data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.warn("sign out failed", err);
    } finally {
      setUser(null);
    }
  };

  // Note Martha: Context value provided.
  const values = { user, login, register, logout };

  // Handle loading / fallback
  if (loading) {
    return <LoadingScreen />; // 👈 uses your LoadingScreen.jsx
  }

  return (
    <AuthContext.Provider value={values}>
      {user ? children : <Login />} {/* 👈 fallback to Login instead of black screen */}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
export default AuthContextProvider; // ⭐ NEW: Default Export für Fast Refresh Fix
