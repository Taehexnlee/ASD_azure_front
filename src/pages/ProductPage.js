import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUser();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/products");
      setProducts(result.data);
      setFilteredProducts(result.data); // Initialize filtered products
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    console.log("Selected category:", category); // Debugging: Log selected category
    console.log("Products before filtering:", products); // Debugging: Log products array

    // Filter products based on the selected category
    if (category === "") {
      // Show all products if "All Categories" is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter(product => product.category === category);
      console.log("Filtered products:", filtered); // Debugging: Log filtered products
      setFilteredProducts(filtered);
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

      {/* Category Filter */}
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
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
