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
  Friendship,
} from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import { LoadingProvider } from './contexts/loading';
import Notifications from './pages/dashboard/Notifications';
import { FriendshipContainer } from './components';
import ApproveParticipants from './pages/ApproveParticipants';
import AcceptedParticipants from './pages/AcceptedParticipants';

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
                <Route path='my-friendship' element={<FriendshipContainer />} />
                <Route
                  path='activity-details/activity/get-pending'
                  element={<ApproveParticipants />}
                />
                <Route
                  path='activity-details/activity/participants/accepted'
                  element={<AcceptedParticipants />}
                />
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
