import { createContext, useState, useEffect } from 'react';


// Note Martha: Create a context for authentication.
const AuthContext = createContext();

// Note Martha: Initialize user state. define context.
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

// Note Martha: Function to fetch user data and update user Data.
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.log('Invalid token');
      }
    };

    getUser();
// Empty dependency array (had to look this up, now I got it.)
  }, []);


// Note Martha: Context value provided (?).
  const values = {
    user,
    setUser,
  };

  return <AuthContext value={values}>{children}</AuthContext>;
};

export { AuthContextProvider, AuthContext };