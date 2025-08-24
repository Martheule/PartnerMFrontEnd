import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';
import { signOut } from '@/data/auth';

// Note from Martha: The useContext hook retrieves the user and setUser from AuthContext. 
// Note from Martha: This allows the component to know if a user is logged in and to update the user state.

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  

  //Note from Martha: User notification Logout starts here, resets user state
  const logOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out!');
      setUser(null);
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };


  
// Note from Martha: A responsive navigation bar using React.
  return (
    <div className='navbar bg-base-100/50 backdrop-blur-md shadow-md sticky top-0 z-50'>
       {/* Logo oder Titel */}
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost normal-case text-xl'>
          Menu 
          <span role='img' aria-labelledby='airplane'>
            🛫
          </span>
          <span role='img' aria-labelledby='heart'>
            ❤️
          </span>
        </Link>
      </div>

{/* Burger Menü für kleine Screens */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/create">Create a Circle</NavLink></li>
          <li><NavLink to="/circles">Your Circles</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </div>

      {/* Normales Menü auf großen Bildschirmen */}
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/create">Create a Circle</NavLink></li>
        <li><NavLink to="/circles">Your Circles</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </div>
  );




     {/* Normales Menü auf großen Bildschirmen */}
 <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to=''>Create a Circle</NavLink>
          </li>
         <li>
            <NavLink to=''>Your Circles</NavLink>
          </li>
          <li>{!user && <NavLink to='/register'>Register</NavLink>}</li>
          <li>
            {user ? (
              <button onClick={logOut}>Logout</button>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
        </ul>
      </div>

   };

export default Navbar;