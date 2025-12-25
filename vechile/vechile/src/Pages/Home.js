import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Vehicle Service Booking",
      subtitle: "Book Your Service Easily Online",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhuKKNZ908lDDDQ1tvkNb1joMT-oVOnWRqaw&s"
    },
    {
      title: "Professional Auto Care",
      subtitle: "Expert Technicians at Your Service",
      image: "https://i.pinimg.com/736x/29/14/00/291400b50378e7cda4cbc71189e81fc2.jpg"
    },
    {
      title: "Quality Parts & Service",
      subtitle: "Genuine Parts with Warranty",
      image: "https://i.pinimg.com/736x/e3/e6/3e/e3e63e67d338fc01f3bd868a8375547c.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>General Service</h3>
            <p>Complete vehicle maintenance and inspection to keep your car running smoothly and safely.</p>
            <img src="https://www.galaxytoyota.in/public/storage/1766/Toyota-car-engine-repair.JPG" alt="General Service" />
          </div>
          <div className="service-card">
            <div className="service-icon">🔨</div>
            <h3>Repair Service</h3>
            <p>Expert repair services for all types of vehicle issues with genuine parts and warranty.</p>
            <img src="https://i.pinimg.com/1200x/f1/f4/a7/f1f4a70121b276b7c73ebf9eb80b58d5.jpg" alt="Repair Service" />
          </div>
          <div className="service-card">
            <div className="service-icon">🚿</div>
            <h3>Wash</h3>
            <p>Professional car washing and detailing services to keep your vehicle looking brand new.</p>
            <img src="https://i.pinimg.com/736x/d9/21/30/d92130cc43286f1088e80e155770dfb6.jpg" alt="Car Wash" />
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h2>Why Choose Us?</h2>
            <p>
              With over 15 years of experience in automotive service, we provide reliable, 
              professional, and affordable vehicle maintenance solutions. Our certified 
              technicians use state-of-the-art equipment and genuine parts.
            </p>
            <p>
              Book your service online and enjoy convenient scheduling, transparent pricing, 
              and quality service that keeps your vehicle running at its best.
            </p>
          </div>
          <div className="about-image">
            <img src="https://i.pinimg.com/736x/2f/d8/33/2fd833c3bf63f312604ec3fa5e81f388.jpg" alt="Service Center" />
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Home;