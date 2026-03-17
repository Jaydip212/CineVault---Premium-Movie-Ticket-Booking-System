# CineVault - Premium Movie Ticket Booking System

A highly animated, visually stunning cinema booking platform built specifically as a full-features college project or startup prototype.

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla ES6)
- **Supabase** (PostgreSQL Database & Authentication)
- Custom CSS logic for animations, glassmorphism, and responsive design

## Features

- **Premium UI/UX:** Dark theme, backdrop blur, hover animations, scroll-reveal transitions, and custom loaders.
- **Seat Booking Logic:** Interactive visual seat map, live pricing calculations, max limits.
- **Backend Connected:** Users can signup, login, and book movies that accurately get tracked in the database online via Supabase.
- **Dashboards:** Dedicated user 'My Bookings' page and an Admin Dashboard to monitor sales and revenue.
- **Fully Mobile-Responsive:** Optimized for all devices (desktop, tablet, mobile) with responsive breakpoints at 1024px, 768px, and 480px.
- **Indian Rupee (INR) Support:** All prices converted from USD to INR (1 USD = 83 INR) for Indian market.

## Recent Updates (March 2026)

### 1. **Currency Conversion (USD → INR)**
- Converted all pricing to Indian Rupees (₹)
- Exchange rate: 1 USD = 83 INR
- **Updated prices:**
  - Regular seats: ₹996 (was $12)
  - Premium seats: ₹1,494 (was $18)
  - VIP seats: ₹2,075 (was $25)
  - Convenience fee: ₹332 (was $4.00)
  - Admin dashboard shows INR amounts with rupee icon (₹)

### 2. **Mobile-Responsive Design Overhaul**
All pages now fully responsive with proper breakpoints:

- **Desktop (1024px+):** Full-featured layout with optimal spacing
- **Tablet (768px-1023px):** Adjusted grids, optimized navigation, readable text
- **Mobile (480px-767px):** Single-column layouts, full-width inputs, touch-friendly buttons
- **Small Mobile (<480px):** Minimum 44px touch targets, 16px font sizes (prevents iOS zoom)

**Pages Optimized:**
- Home page (index.html)
- Movies listing (movies.html)
- Movie details (movie-details.html)
- User authentication (login.html, signup.html)
- Seat selection with mobile-optimized seat map
- Checkout page with stacked payment & summary
- Booking success ticket display
- My bookings history
- Admin dashboard (responsive sidebar)
- Admin login portal
- 404 error page

**Mobile Features:**
- ✅ Touch-friendly navigation (hamburger menu)
- ✅ Responsive tables that scroll horizontally
- ✅ Optimized form inputs with proper spacing
- ✅ Flexible image sizing
- ✅ Readable typography at all sizes
- ✅ No horizontal scrolling
- ✅ Proper padding and margins for mobile

## Setup Instructions

If you wish to configure the backend correctly with Supabase rather than running entirely locally on mock data:

1. Create an account on <https://database.new> and create a new project.
2. In the sidebar, go to **SQL Editor**. Copy everything from the `database_setup.sql` file and click `Run`. This will initialize your database with the necessary tables and dummy movies.
3. Next, from your Supabase Dashboard, click the gear icon to go to **Project Settings** -> **API**.
4. Scroll down, copy the **Project URL** and the **anon public API key**.
5. Paste those values into `js/supabase.js` on lines 8 and 9 where instructed.

## Admin Login Credentials

For demonstration and testing purposes, you can jump straight into the Admin Dashboard without needing to create a backend account.

From the `index.html` main page scroll to the bottom footer and click `Admin Portal` (or navigate directly to `admin/login.html`). Use the following credentials:

- **Email:** <admin@cinevault.com>
- **Password:** admin123
- **Security Key:** cineadmin

## How to Run

Simply use a live server (Like the VS Code Live Server extension or Python's `python -m http.server`) on the root folder. No `npm install` is required for this vanilla stack!

## File Structure

```
├── index.html                 # Home page
├── movies.html               # Movies listing
├── movie-details.html        # Movie details & booking
├── login.html                # User login
├── signup.html               # User registration
├── seat-selection.html       # Interactive seat map
├── checkout.html             # Payment page
├── success.html              # Booking confirmation
├── bookings.html             # My bookings history
├── 404.html                  # Error page
├── admin/
│   ├── index.html           # Admin dashboard
│   ├── login.html           # Admin login
│   └── admin.js             # Admin functionality
├── css/
│   ├── style.css            # Main styles
│   ├── animations.css       # Animation effects
│   └── responsive.css       # Mobile responsive styles
├── js/
│   ├── app.js               # Global app logic
│   ├── auth.js              # Authentication logic
│   ├── booking.js           # Booking workflow
│   ├── checkout.js          # Checkout logic
│   ├── movies.js            # Movie data & methods
│   ├── seat-selection.js    # Seat selection logic
│   └── supabase.js          # Supabase configuration
└── README.md                 # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- No external dependencies required (vanilla JavaScript)
- CSS animations use GPU acceleration
- Responsive images reduce load on mobile
- Lazy loading can be implemented for movie posters
- Database queries optimized with Supabase indexing

## Author

CineVault Admin Team

## License

This project is open source for educational purposes.
