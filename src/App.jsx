import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout, ProtectedLayout, AuthLayout } from '@/layouts';
import { Home, Login, NotFound, Register, Welcome, CircleRouter, AfterLoginCreate, InviteFriend, FindYourMood, InvitationScreen } from '@/pages';


const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Auth-Seiten ohne Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} /> 
        <Route path="register" element={<Register />} />
        <Route path="circle" element={<CircleRouter />} />
        <Route path="InviteFriend" element={<InviteFriend />} />
        <Route path="AfterLoginCreate" element={<AfterLoginCreate/>} />
        <Route path="FindYourMood" element={<FindYourMood/>} />
        <Route path="InvitationScreen" element={<InvitationScreen/>} />
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