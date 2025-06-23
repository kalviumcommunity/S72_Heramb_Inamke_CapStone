import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./AuthPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "../useAuth";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate= useNavigate()
  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(!user)
  if (!user) {
    // return <Navigate to="/auth" />;
    navigate("/auth")
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;