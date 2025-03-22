import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./AuthPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "../useAuth";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/dashboard" 
          element={
              <Dashboard />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
