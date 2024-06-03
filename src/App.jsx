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
  ChangePassword,
  SingleActivity,
  Connect,
} from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import { LoadingProvider } from './contexts/loading';
import Friendship from './pages/Friendship';
import Notifications from './pages/dashboard/Notifications';

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
                <Route path='connect' element={<Connect />} />
                <Route path='profile' element={<Profile />} />
                <Route path='notifications' element={<Notifications />} />
                <Route path='password/change' element={<ChangePassword />} />
                <Route path='activity-details' element={<SingleActivity />} />
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
