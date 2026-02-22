// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // For notifications
import HomePage from '/src/components/HomePage.jsx';
import BookUnitPage from '/src/components/BookUnitPage.jsx';
import MyBookingsPage from '/src/components/MyBookingsPage.jsx';
import SettingsPage from '/src/components/SettingsPage.jsx';
import Header from '/src/components/Header.jsx';
import Footer from '/src/components/Footer.jsx';
import axios from 'axios';
import './App.css';

// Root App component. Sets up routing and shared elements like Toaster.
function App() {
  return (
    <Router>
      <Toaster /> {/* Global toast notifications */}
      <Header /> {/* Shared header */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
        <Route path="/book" element={<BookUnitPage />} /> {/* Booking page route */}
        <Route path="/bookings" element={<MyBookingsPage />} /> {/* View bookings route */}
        <Route path="/settings" element={<SettingsPage />} /> {/* Settings page route */}
      </Routes>
      <Footer /> {/* Shared footer */}
    </Router>
  );
}

export default App;