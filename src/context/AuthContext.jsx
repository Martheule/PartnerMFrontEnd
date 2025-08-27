import { createContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, me } from '@/data/auth';

// Note Martha: Create a context for authentication.
const AuthContext = createContext();

// Note Martha: Initialize user state. define context.
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Martha: holds the JWT token

  // Note Martha: Function to fetch user data with me() and update user Data.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      me(savedToken)
        .then(setUser)
        .catch(() => {
          console.log('Invalid token');
          setUser(null);
          setToken(null);
        });
    }
  }, []);

  // Note Martha: Login function (calls backend, stores token, sets user)
  const login = async ({ email, password }) => {
    try {
      const data = await signIn({ email, password });
      localStorage.setItem("token", data.token); // Martha: store token
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Note Martha: Register function
  const register = async ({ email, password }) => {
    try {
      const data = await signUp({ email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Note Martha: Logout function (clears backend + local storage)
  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  };

  // Note Martha: Context value provided.
  const values = {
    user,
    token,
    login,     
    register,
    logout,    
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
export default AuthContextProvider; // ⭐ NEW: Default Export für Fast Refresh Fix
