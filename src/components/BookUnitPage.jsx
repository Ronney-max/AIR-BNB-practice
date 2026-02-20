// src/pages/BookUnitPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Book Unit page: Form for creating a booking (CREATE operation).
function BookUnitPage() {
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({ unitId: '', occupants: '', days: '', currency: 'USD' });
  const [currencies, setCurrencies] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState(null);

  // Fetch available units and currencies from Frankfurter API.
  useEffect(() => {
    axios.get('http://localhost:3000/units').then(res => setUnits(res.data));
    axios.get('https://api.frankfurter.app/currencies').then(res => setCurrencies(Object.keys(res.data)));
  }, []);

  // Handle form changes.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert price using Frankfurter API.
  const convertPrice = async () => {
    if (!formData.unitId || !formData.days) return;
    const unit = units.find(u => u.id == formData.unitId);
    const basePrice = unit.pricePerDay * formData.days;
    if (formData.currency === 'USD') {
      setConvertedPrice(basePrice);
      return;
    }
    try {
      const res = await axios.get(`https://api.frankfurter.app/latest?amount=${basePrice}&from=USD&to=${formData.currency}`);
      setConvertedPrice(res.data.rates[formData.currency]);
    } catch (error) {
      toast.error('Currency conversion failed');
    }
  };

  // Submit booking.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/bookings', {
      ...formData,
      totalPrice: convertedPrice || 0,
    }).then(() => {
      toast.success('Booking created!'); // Success notification
      setFormData({ unitId: '', occupants: '', days: '', currency: 'USD' });
    }).catch(() => toast.error('Failed to create booking'));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book a Unit</h2>
      <form onSubmit={handleSubmit}>
        <select name="unitId" value={formData.unitId} onChange={handleChange} required>
          <option value="">Select Unit</option>
          {units.map(unit => <option key={unit.id} value={unit.id}>{unit.type}</option>)}
        </select>
        <input name="occupants" value={formData.occupants} onChange={handleChange} placeholder="Number of Occupants" required />
        <input name="days" value={formData.days} onChange={handleChange} placeholder="Number of Days" required />
        <select name="currency" value={formData.currency} onChange={handleChange}>
          {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
        <button type="button" onClick={convertPrice}>Convert Price</button>
        {convertedPrice && <p>Total Price: {convertedPrice} {formData.currency}</p>}
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookUnitPage;