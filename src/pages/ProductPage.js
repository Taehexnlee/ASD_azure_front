import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProductPage() {

  const { user } = useUser();
  let navigate = useNavigate();

  // Redirect to home if the user is not an admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3 mb-4" key={product.id}>
            {/* The card itself is clickable, but no description is shown here */}
            <Link to={`/viewproduct/${product.id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://via.placeholder.com/150"
                  className="card-img-top"
                  alt="Product Image"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
