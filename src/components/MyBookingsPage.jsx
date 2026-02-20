import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // For confirmations
import toast from 'react-hot-toast';

// My Bookings page: List bookings with UPDATE and DELETE (READ, UPDATE, DELETE operations).
function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ occupants: '', days: '' });

  // Fetch bookings on mount.
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:3000/bookings')
      .then(res => setBookings(res.data))
      .catch(() => toast.error('Failed to load bookings'));
  };

  // Start editing.
  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm({ occupants: booking.occupants, days: booking.days });
  };

  // Save update.
  const handleUpdate = (id) => {
    axios.patch(`http://localhost:3000/bookings/${id}`, editForm)
      .then(() => {
        toast.success('Booking updated!');
        setEditingId(null);
        fetchBookings();
      })
      .catch(() => toast.error('Update failed'));
  };

  // Delete with confirmation.
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the booking.',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/bookings/${id}`)
          .then(() => {
            toast.success('Booking deleted!');
            fetchBookings();
          })
          .catch(() => toast.error('Delete failed'));
      }
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Bookings</h2>
      {bookings.map(booking => (
        <div key={booking.id} style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
          <p>Unit ID: {booking.unitId}</p>
          {editingId === booking.id ? (
            <>
              <input value={editForm.occupants} onChange={e => setEditForm({ ...editForm, occupants: e.target.value })} />
              <input value={editForm.days} onChange={e => setEditForm({ ...editForm, days: e.target.value })} />
              <button onClick={() => handleUpdate(booking.id)}>Save</button>
            </>
          ) : (
            <>
              <p>Occupants: {booking.occupants}</p>
              <p>Days: {booking.days}</p>
              <p>Total: {booking.totalPrice} {booking.currency}</p>
              <button onClick={() => handleEdit(booking)}>Edit</button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookingsPage;