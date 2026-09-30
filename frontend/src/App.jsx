import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Events from "./pages/Events";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import Login from "./pages/Login";
import Communities from "./pages/Communities";
import PanditRegistration from "./pages/PanditRegistration";
import AdminPandits from "./pages/AdminPandits";


// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// =====================================================
// APP
// =====================================================

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );


  // Called after successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }


  // =====================================================
  // APPLICATION ROUTES
  // =====================================================

  return (
    <Routes>

      {/* Dashboard */}
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* Communities */}
      <Route
        path="/communities"
        element={<Communities />}
      />


      {/* Posts */}
      <Route
        path="/posts"
        element={<Posts />}
      />


      {/* Events */}
      <Route
        path="/events"
        element={<Events />}
      />


      {/* Profile */}
      <Route
        path="/profile"
        element={
          <div>
            Profile page coming soon
          </div>
        }
      />


      {/* Notifications */}
      <Route
        path="/notifications"
        element={
          <div>
            Notifications page coming soon
          </div>
        }
      />


      {/* Pandit Registration */}
      <Route
        path="/pandit-registration"
        element={
          <ProtectedRoute>
            <PanditRegistration />
          </ProtectedRoute>
        }
      />


      {/* Admin Pandits */}
      <Route
        path="/admin/pandits"
        element={
          <ProtectedRoute>
            <AdminPandits />
          </ProtectedRoute>
        }
      />


      {/* Moderator Dashboard */}
      <Route
        path="/moderator-dashboard"
        element={
          <ProtectedRoute>
            <ModeratorDashboard />
          </ProtectedRoute>
        }
      />


      {/* Unknown URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;