import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Home page: Displays list of available units from db.json.
function HomePage() {
  const [units, setUnits] = useState([]);

  // Fetch units on mount.
  useEffect(() => {
    axios.get('http://localhost:3000/units')
      .then(response => setUnits(response.data))
      .catch(error => {
        console.error('Error fetching units:', error);
        toast.error('Failed to load units'); // Notification on error
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Airbnb Booking</h2>
      <p>Easily book units with flexible rates and 24/7 support.</p>
      <h3>Available Units</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {units.map(unit => (
          <div key={unit.id} style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem', width: '200px' }}>
            <h4>{unit.type}</h4>
            <p>Price per day: ${unit.pricePerDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;