import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout, ProtectedLayout, AuthLayout } from '@/layouts';
import { Home, Login, NotFound, Register, Welcome, AfterLogin, FirstTimeAfterLogin } from '@/pages';



const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Auth-Seiten ohne Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} /> 
        <Route path="register" element={<Register />} />
        <Route path="after-login" element={<AfterLogin />} />
        <Route path="First-login" element={<FirstTimeAfterLogin />} />
      </Route>

      {/* Seiten mit Navbar */}
      <Route element={<RootLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="create" element={<ProtectedLayout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  </BrowserRouter>
);

// Robin: Named Exports need curly's. defaults exports are without.
export default App;