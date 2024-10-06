import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "" // Add category field
  });

  const { name, description, price, category } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/product", product);
    navigate("/productpage");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Category" className="form-label">Category</label>
              <select
                className="form-control"
                name="category"
                value={category}
                onChange={onInputChange}
              >
                <option value="">Select a Category</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Courses">Main Courses</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">Add Product</button>
            <Link className="btn btn-outline-danger mx-2" to="/productpage">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
