import {  Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RequesterDashboard from './pages/Requester-Dashboard';
import Profile from './pages/Profile';
import RequestDetails from './components/requester/RequestDetails';
import NewRequest from './pages/NewRequest';
import { Roles } from './types/types';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import UserDashboard from './pages/User-Dashboard';
import InvestigatorDashboard from './pages/Investigator-Dashboard';
import PostReport from './components/investigator/PostReport';


function App() {

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/requester-dashboard"
            element={
              <ProtectedRoute  allowedRoles={[Roles.REQUESTER]}>
                <RequesterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests/new"
            element={
              <ProtectedRoute allowedRoles={[Roles.REQUESTER]}>
                <NewRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests/:id"
            element={
              <ProtectedRoute allowedRoles={[Roles.REQUESTER, Roles.INVESTIGATOR]}>
                <RequestDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investigator"
            element={
              <ProtectedRoute allowedRoles={[Roles.INVESTIGATOR]}>
                <InvestigatorDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/report/:id"
            element={
              <ProtectedRoute allowedRoles={[Roles.INVESTIGATOR]}>
                <PostReport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;