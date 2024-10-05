import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="container my-4">
      {/* Hero Section */}
      <div className="hero-section text-center">
        <h2>{user ? `Welcome, ${user.username}, to ASD Restaurant!` : 'Welcome to ASD Restaurant!'}</h2>
        <p>Experience the best of our cuisine. Order now and enjoy our specials!</p>
        {user && <Link className="btn btn-primary mt-3" to="/productpage">View Menu</Link>}
      </div>

      {/* Featured Products (Logged-in users only) */}
      {user && (
        <div className="featured-products my-5">
          <h3 className="text-center">Featured Products</h3>
          {/* Placeholder for product cards */}
          <div className="row">
            {/* Map through a list of featured products to display them here */}
          </div>
        </div>
      )}

      {/* About Us Section */}
      <div className="about-us my-5">
        <h3>About Us</h3>
        <p>ASD Restaurant is known for its delicious meals and excellent service. We offer a variety of dishes, crafted with passion and love. Whether you’re craving something spicy, sweet, or savory, we have something for everyone.</p>
      </div>

      {/* Special Offers Section */}
      <div className="special-offers my-5">
        <h3>Special Offers</h3>
        <p>Check out our limited-time offers and enjoy discounts on your favorite meals!</p>
      </div>

      {/* Footer */}
      <div className="footer text-center mt-5">
        <p>Contact us: (123) 456-7890 | Email: contact@asdrestaurant.com</p>
        <p>Follow us on social media!</p>
      </div>
    </div>
  );
}
