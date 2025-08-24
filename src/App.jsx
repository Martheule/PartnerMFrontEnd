import { BrowserRouter, Routes, Route } from 'react-router';
import { RootLayout, ProtectedLayout } from '@/layouts';
import { Home, Login, NotFound, Register } from '@/pages';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='create' element={<ProtectedLayout />} >
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// Robin: Named Exports need curly's. defaults exports are without.
export default App;