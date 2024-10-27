import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // State for multiple selected categories
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const { user, addToCart } = useUser();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/products");
      setProducts(result.data);
      setFilteredProducts(result.data);  // Initialize with all products
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // Handle category selection for multiple categories
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category) // Remove if already selected
        : [...prevSelected, category] // Add if not already selected
    );
  };

  const handleAvailabilityChange = (e) => setAvailabilityFilter(e.target.value);

  // Filter products based on selected categories and availability
  const handleSearch = () => {
    const filtered = products.filter((product) => {
      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesAvailability = availabilityFilter === "All" || (availabilityFilter === "Available" && product.active);

      return matchesCategories && matchesAvailability;
    });
    setFilteredProducts(filtered);
  };

  const toggleProductAvailability = async (id) => {
    try {
      const result = await axios.put(`http://localhost:8080/product/${id}/toggleAvailability`);
      const updatedProduct = result.data;

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
      );

      handleSearch();
    } catch (error) {
      console.error("Error toggling product availability:", error);
    }
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
        <label className="form-label">Filter by Category:</label>
        <div className="form-check">
          {["Appetizers", "Main Courses", "Desserts", "Drinks", "Vegetarian", "Non-Vegetarian", "Gluten-Free"].map((category) => (
            <div key={category}>
              <input
                className="form-check-input"
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label">{category}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="my-3">
        <label htmlFor="availabilityFilter" className="form-label">Filter by Availability:</label>
        <select
          id="availabilityFilter"
          className="form-control"
          value={availabilityFilter}
          onChange={handleAvailabilityChange}
        >
          <option value="All">All Products</option>
          <option value="Available">Available Only</option>
        </select>
      </div>

      <div className="text-center my-3">
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
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
