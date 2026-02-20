// src/components/Header.jsx
import { Link } from 'react-router-dom';

// Header component with navigation links. Shared across pages.
function Header() {
  return (
    <header style={{ background: '#f8f9fa', padding: '1rem', textAlign: 'center' }}>
      <h1>Airbnb Booking App</h1>
      <nav>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/book" style={{ margin: '0 1rem' }}>Book Unit</Link>
        <Link to="/bookings" style={{ margin: '0 1rem' }}>My Bookings</Link>
        <Link to="/settings" style={{ margin: '0 1rem' }}>Settings</Link>
      </nav>
    </header>
  );
}

export default Header;