import React from 'react';
import '../Styles/Services.css';

const Services = () => {
  const handleBooking = (serviceType) => {
    alert(`Booking ${serviceType}. Redirecting to booking form...`);
    // Add actual booking logic here
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>SERVICES</h1>
          <p>Professional Care for Your Vehicle, All in One Place</p>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="services-cards-section">
        <div className="container">
          <div className="services-grid">
            <div className="service-card-large">
                <img src="https://www.galaxytoyota.in/public/storage/1766/Toyota-car-engine-repair.JPG" alt="General Service" />
          <div className="card-content">
                <h3>General Service</h3>
                <p>Complete routine maintenance including oil change, filter replacement, and comprehensive vehicle inspection.</p>
                <button className="book-btn" onClick={() => handleBooking('General Service')}>Book Now</button>
              </div>
            </div>
            <div className="service-card-large">
               <img src="https://i.pinimg.com/1200x/f1/f4/a7/f1f4a70121b276b7c73ebf9eb80b58d5.jpg" alt="Repair Service" />
           <div className="card-content">
                <h3>Repair Service</h3>
                <p>Expert mechanical and electrical repairs with genuine parts and professional diagnostics.</p>
                <button className="book-btn" onClick={() => handleBooking('Repair Service')}>Book Now</button>
              </div>
            </div>
            <div className="service-card-large">
               <img src="https://i.pinimg.com/736x/d9/21/30/d92130cc43286f1088e80e155770dfb6.jpg" alt="Car Wash" />
          <div className="card-content">
                <h3>Car Wash & Detailing</h3>
                <p>Premium cleaning and detailing services to keep your vehicle looking brand new inside and out.</p>
                <button className="book-btn" onClick={() => handleBooking('Car Wash & Detailing')}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">📅</div>
              <h4>Easy Online Booking</h4>
              <p>Book your service appointment online 24/7</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🔧</div>
              <h4>Skilled Professionals</h4>
              <p>Certified technicians with years of experience</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔧</div>
              <h4>Genuine Spare Parts</h4>
              <p>Only authentic parts with manufacturer warranty</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h4>Transparent Pricing</h4>
              <p>No hidden charges, upfront cost estimates</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⏰</div>
              <h4>On-Time Service</h4>
              <p>Punctual service delivery as promised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="container">
          <h2>Special Offers</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-icon">🎉</div>
              <h4>10% Off First Service</h4>
              <p>New customers get 10% discount on their first service</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">🏆</div>
              <h4>Loyalty Rewards</h4>
              <p>Earn points with every service and get exclusive benefits</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">🌟</div>
              <h4>Seasonal Discounts</h4>
              <p>Special maintenance packages during seasonal offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <img src="https://i.pinimg.com/1200x/45/9f/cd/459fcd5c1f98064cb5a325264391f748.jpg" alt="Book Service" />
            <div className="cta-content">
              <h3>Ready to Service Your Vehicle?</h3>
              <p>Book your appointment today and experience professional automotive care</p>
              <button className="cta-btn" onClick={() => handleBooking('Service Appointment')}>Book Your Service Now</button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📞 Phone: +91 9876543210</p>
            <p>✉️ Email: autoservice@gmail.com</p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>📍 123 Service Street<br />Auto City</p>
          </div>
          <div className="footer-section">
            <h3>Hours</h3>
            <p>Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 4:00 PM<br />Sun: Closed</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AutoService. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;