import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/product/${id}`);
    loadProducts();
  };

  return (
    <div className="container my-4">
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3 mb-4" key={product.id}> {/* col-md-3 for 4 cards in a row */}
            <div className="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${product.price}
                </p>
                <div className="d-flex justify-content-between">
                  <Link className="btn btn-primary" to={`/viewproduct/${product.id}`}>View</Link>
                  <Link className="btn btn-outline-primary" to={`/editproduct/${product.id}`}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
