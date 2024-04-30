import { Landing, Error, Dashboard, Register } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AuthProvider from './contexts/auth';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
