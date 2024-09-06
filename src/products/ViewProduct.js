import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  const { id } = useParams();
  let navigate = useNavigate();  // For navigation after deletion

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/product/${id}`);
    setProduct(result.data);
  };

  // Delete product
  const deleteProduct = async () => {
    await axios.delete(`http://localhost:8080/product/${id}`);
    navigate("/"); // Navigate back to home after deletion
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
                  <b>Description:</b> {product.description} {/* Description shown here */}
                </li>
                <li className='list-group-item'>
                  <b>Price:</b> ${product.price}
                </li>
              </ul>
            </div>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="d-flex justify-content-between my-2">
            <Link className='btn btn-outline-primary' to={`/editproduct/${id}`}>Edit</Link>
            <button className='btn btn-danger' onClick={deleteProduct}>Delete</button>
          </div>

          <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
