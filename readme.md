# Airbnb Booking App

A simple, modern booking platform inspired by Airbnb, focused on various units (bedsitters, executive bedsitters, one-bedroom apartments) with flexible rates, currency conversion, and multi-language support.  
This project aims to solve common issues in booking platforms: high service fees, limited local visibility, and fraud concerns — by offering transparent pricing, efficient currency handling, 24/7 availability, and personalized feedback.

## Features

- Browse available unit types (Bedsitter, Executive Bedsitter, One Bedroom)
- Create bookings with number of occupants, days, and preferred currency
- Real-time currency conversion using **Frankfurter API**
- Language selection demo using **REST Countries API**
- View, edit, and delete your bookings (full CRUD)
- Toast notifications (react-hot-toast) & confirmation dialogs (SweetAlert2)
- Responsive design with clean, minimal UI
- Mock backend persistence using **json-server** (db.json)


## Project Structure
airbnb-app/
├── db.json                 # Mock database (units + bookings)
├── package.json
├── vite.config.js          # Proxy setup for /api → json-server
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── BookUnitPage.jsx
│       ├── MyBookingsPage.jsx
│       └── SettingsPage.jsx
└── public/                 # (Vite default)
## Deployment
Frontend (Vite + React)

Build: npm run dev
Deploy the folder to:
Netlify (drag & drop dist folder)

The json-server (db.json) is only for development.

## API Integration Notes
Currency conversion: https://api.frankfurter.app
Languages: https://restcountries.com/v3.1/all?fields=languages
Mock API endpoints (via proxy /api/...):
GET /api/units
GET /api/bookings
POST /api/bookings
PATCH /api/bookings/:id
DELETE /api/bookings/:id


## Objectives Achieved

Easy-to-understand UI
View booked units (My Bookings page)
Add unit + occupants + days
Currency & language support via APIs
Persistent data (CRUD) with mock DB