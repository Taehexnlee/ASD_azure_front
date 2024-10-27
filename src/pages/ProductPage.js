import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user, addToCart } = useUser();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/products");
      setProducts(result.data);
      setFilteredProducts(result.data); 
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const toggleProductAvailability = async (id) => {
    console.log(`Toggling availability for product ID: ${id}`);
    try {
      const result = await axios.put(`http://localhost:8080/product/${id}/toggleAvailability`);
      const updatedProduct = result.data;
      console.log("Updated product:", updatedProduct);


      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      setFilteredProducts((prevFiltered) =>
        prevFiltered.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error setting product active:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilteredProducts(category === "" ? products : products.filter(product => product.category === category));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Product Page</h2>

      {user && user.isAdmin && (
        <div className="text-center my-3">
          <Link className="btn btn-primary" to="/addproduct">Add New Product</Link>
        </div>
      )}

      <div className="my-3">
        <label htmlFor="categoryFilter" className="form-label">Filter by Category:</label>
        <select
          id="categoryFilter"
          className="form-control"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Desserts">Desserts</option>
          <option value="Drinks">Drinks</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <Link to={`/viewproduct/${product.id}`} className="text-decoration-none text-dark">
                <img
                  src="https://via.placeholder.com/150"
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  <p className="card-text"><strong>Status:</strong> {product.active ? "Available" : "Unavailable"}</p>
                </div>
              </Link>
              <div className="card-footer">
                {user && user.isAdmin ? (
                  <button
                    className={`btn ${product.active ? 'btn-primary' : 'btn-outline-secondary'} w-100`}
                    onClick={() => toggleProductAvailability(product.id)}
                  >
                    {product.active ? "Set Inactive" : "Set Active"}
                  </button>
                ) : (
                  product.active && (
                    <button className="btn btn-outline-primary w-100" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
