import { Landing, Error, Register } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AuthProvider from './contexts/auth';
import { UserProvider } from './contexts/user';
import {
  Stats,
  AddActivity,
  AllActivities,
  SharedLayout,
  Explore,
  Profile,
} from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import { LoadingProvider } from './contexts/loading';

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRoute>
                    <SharedLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Stats />} />
                <Route path='all-activities' element={<AllActivities />} />
                <Route path='add-activity' element={<AddActivity />} />
                <Route path='explore' element={<Explore />} />
                <Route path='profile' element={<Profile />} />
              </Route>
              <Route path='/landing' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<Error />} />
            </Routes>
            <ToastContainer position='top-center' />
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
