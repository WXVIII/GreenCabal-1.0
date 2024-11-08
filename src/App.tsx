import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CommunityBoard from "./pages/CommunityBoard";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignedIn>
      {children}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </SignedIn>
  );
};
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <div className="min-h-screen bg-[#022424] text-[#03ffc3]">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <LandingPage />
                  </>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/panel"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />
              <Route
                path="/community"
                element={
                  <ProtectedRoutes>
                    <Navbar />
                    <CommunityBoard />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <Navbar />
                    <Profile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoutes>
                    <Navbar />
                    <Payment />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes>
                    <Navbar />
                    <Dashboard />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </div>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
