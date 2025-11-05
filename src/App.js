// src/App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import OfferLetters from "./pages/OfferLetters";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  // Authenticated layout (Dashboard + Sidebar + Navbar)
  const AuthenticatedLayout = ({ children }) => (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* ✅ Add Login Route */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Protected routes */}
      {user ? (
        <>
          <Route
            path="/dashboard"
            element={
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/employees"
            element={
              <AuthenticatedLayout>
                <Employees />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/attendance"
            element={
              <AuthenticatedLayout>
                <Attendance />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/leaves"
            element={
              <AuthenticatedLayout>
                <Leaves />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/payroll"
            element={
              <AuthenticatedLayout>
                <Payroll />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/offerletters"
            element={
              <AuthenticatedLayout>
                <OfferLetters />
              </AuthenticatedLayout>
            }
          />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;


