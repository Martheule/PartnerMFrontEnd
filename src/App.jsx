import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout, ProtectedLayout, AuthLayout } from '@/layouts';
import { Home, Login, NotFound, Register, Welcome, CircleRouter, AfterLoginCreate, InviteFriend, FindYourMood, InvitationScreen, QuestionSheet4, QuestionSheet3, QuestionSheet2, QuestionSheet1, TrackingBoard2, TrackingBoard1, ForgotPasswordSend } from '@/pages';


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
        <Route path="QuestionSheet1" element={<QuestionSheet1/>} />
        <Route path="QuestionSheet2" element={<QuestionSheet2/>} />
        <Route path="QuestionSheet3" element={<QuestionSheet3/>} />
        <Route path="QuestionSheet4" element={<QuestionSheet4/>} />
        <Route path="ForgotPasswordSend" element={<ForgotPasswordSend/>} />
        <Route path="TrackingBoard1" element={<TrackingBoard1/>} />
        <Route path="TrackingBoard2" element={<TrackingBoard2/>} />
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