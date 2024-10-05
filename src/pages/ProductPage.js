import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const { user } = useUser(); // Get user info from context

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
  };

  return (
    <div className="container my-4">

      {/* Add Product Button for Admin */}
      {user && user.isAdmin && (
        <div className="text-center my-3">
          <Link className="btn btn-primary" to="/addproduct">Add New Product</Link>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <Link to={`/viewproduct/${product.id}`} className="text-decoration-none text-dark">
                <img
                  src="https://via.placeholder.com/150"
                  className="card-img-top"
                  alt="Product Image"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
