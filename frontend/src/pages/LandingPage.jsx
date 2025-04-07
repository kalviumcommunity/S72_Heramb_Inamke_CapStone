import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingStyles.css";

const LandingPage = () => {
  // Add the animation setup function that will run after component mount
  useEffect(() => {
    // Wait a bit for DOM to be fully rendered
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.slide-in');
      
      // Create intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Add the active class when element is in view
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animation has run
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px'
      });
      
      // Observe all elements with slide-in class
      animatedElements.forEach(el => {
        observer.observe(el);
      });
      
      // Initial animation for elements already in view
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          el.classList.add('active');
          observer.unobserve(el);
        }
      });
      
      // Clean up observer on unmount
      return () => {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      };
    }, 100);
  }, []); // Empty array means this runs once after mount

  return (
    <div className="landing-container">
      {/* Decorative elements */}
      <div className="decorative-flower flower-top-left">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#d88c8c" d="M50,0 C60,30 70,40 100,50 C70,60 60,70 50,100 C40,70 30,60 0,50 C30,40 40,30 50,0 Z" />
        </svg>
      </div>
      <div className="decorative-flower flower-bottom-right">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#d88c8c" d="M50,0 C60,30 70,40 100,50 C70,60 60,70 50,100 C40,70 30,60 0,50 C30,40 40,30 50,0 Z" />
        </svg>
      </div>
      
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="logo">Eternal Love</div>
          <Link to="/auth" className="nav-button">Sign In</Link>
        </nav>
      </header>
      
      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content slide-in slide-left">
            <h1 className="hero-title">Your Perfect Day Awaits</h1>
            <p className="hero-subtitle">Plan your dream wedding with ease and elegance</p>
            <Link to="/auth" className="cta-button">Get Started</Link>
          </div>
          <div className="hero-image slide-in slide-right">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Wedding celebration" />
          </div>
        </section>
        
        <section className="features-section">
          <h2 className="section-title slide-in slide-up">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card slide-in slide-up">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Personalized Planning</h3>
              <p className="feature-description">Customize every detail to match your unique vision and style.</p>
            </div>
            
            <div className="feature-card slide-in slide-up delay-200">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="feature-title">Seamless Scheduling</h3>
              <p className="feature-description">Keep track of all your appointments, deadlines, and important dates.</p>
            </div>
            
            <div className="feature-card slide-in slide-up delay-400">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="feature-title">Guest Management</h3>
              <p className="feature-description">Easily manage your guest list, RSVPs, and seating arrangements.</p>
            </div>
          </div>
        </section>
        
        <section className="testimonials-section">
          <h2 className="section-title slide-in slide-up">Happy Couples</h2>
          <div className="testimonials-carousel">
            <div className="testimonial-card slide-in slide-up">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1623091410901-00e2d268901f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Happy couple" />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">"This platform made our wedding planning so much easier. We could focus on enjoying our special day instead of stressing about the details."</p>
                <p className="testimonial-author">- Sarah & Michael</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <div className="cta-content slide-in slide-up">
            <h2 className="cta-title">Begin Your Journey Together</h2>
            <p className="cta-description">Create your account today and start planning the wedding of your dreams.</p>
            <Link to="/auth" className="cta-button">Get Started Now</Link>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo slide-in slide-left">Eternal Love</div>
          <div className="footer-links slide-in slide-up">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
          <div className="footer-social slide-in slide-right">
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom slide-in slide-up">
          <p>© 2025 Eternal Love. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;