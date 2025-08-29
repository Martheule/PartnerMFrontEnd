const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
  throw new Error('API URL is required, are you missing a .env file?');
const baseURL = `${API_URL}/auth`; //http://localhost:4321/auth

//This function only takes care of sending a POST request
export const signUp = async (formData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    // Note Martha: cookie for backend session
    credentials: 'include', 
  });
// console.log (res);
  if (!res.ok) throw new Error('Error while signing up!');
    return await res.json(); // should return user info (but token is in cookie)
};

export const signIn = async (formData) => {
  const res = await fetch(`${baseURL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include', //To recieve cookies
  });

  if (!res.ok) 
    throw new Error('Error while signing in!');

  //const data = await res.json();
  return await res.json();
//  return data;
};

export const signOut = async () => {
  const res = await fetch(`${baseURL}/signout`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Invalid token');
};

export const me = async (token) => {
  const res = await fetch(`${baseURL}/me`, {
    credentials: 'include',  // ✅ cookie is automatically sent
  });

  if (!res.ok) throw new Error('Invalid token');
  return await res.json();
};