import { Landing, Error, Register } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AuthProvider from './contexts/auth';
import {
  Stats,
  AddActivity,
  AllActivities,
  SharedLayout,
  Explore,
} from './pages/dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Stats />} />
            <Route path='all-activities' element={<AllActivities />} />
            <Route path='add-activity' element={<AddActivity />} />
            <Route path='explore' element={<Explore />} />
          </Route>
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
