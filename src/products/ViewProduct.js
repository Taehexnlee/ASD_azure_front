import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

export default function ViewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true // Assuming default as active; it will be updated by loadProduct()
  });

  const { id } = useParams();
  const { user, addToCart } = useUser(); // Get user and addToCart function
  let navigate = useNavigate();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/product/${id}`);
    setProduct(result.data);
  };

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:8080/product/${id}`);
    navigate("/productpage");
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Product Detail</h2>
          <div className="card">
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <b>Name:</b> {product.name}
                </li>
                <li className='list-group-item'>
                  <b>Description:</b> {product.description}
                </li>
                <li className='list-group-item'>
                  <b>Price:</b> ${product.price}
                </li>
                <li className='list-group-item'>
                  <b>Category:</b> {product.category}
                </li>
                <li className='list-group-item'>
                  <b>Status:</b> {product.active ? "Available" : "Unavailable"}
                </li>
              </ul>
            </div>

            {/* Conditionally render Add to Cart button only if product is active */}
            {user && !user.isAdmin && product.active && (
              <div className="card-footer">
                <button className="btn btn-outline-primary w-100" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Edit and Delete Buttons for Admin */}
          {user && user.isAdmin && (
            <div className="d-flex justify-content-between my-2">
              <Link className='btn btn-outline-primary' to={`/editproduct/${id}`}>Edit</Link>
              <button className='btn btn-danger' onClick={deleteProduct}>Delete</button>
            </div>
          )}

          <Link className='btn btn-primary my-2' to={"/productpage"}>Back to Product Page</Link>
        </div>
      </div>
    </div>
  );
}
