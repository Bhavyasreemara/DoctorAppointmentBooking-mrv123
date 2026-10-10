import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor/:id" element={<DoctorDetailsPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} MediBook • Doctor Appointment Booking</p>
      </footer>
    </div>
  );
}

export default App;
