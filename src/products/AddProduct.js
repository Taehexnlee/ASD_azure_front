import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {

  let navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  const { name, description, price } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/product", product);
    navigate("/productpage");
  };

  const onCancel = () => {
    navigate("/productpage");
  };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add New Product</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>Name</label>
              <input type="text" className='form-control' placeholder='Enter product name' name='name' value={name} onChange={onInputChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='Description' className='form-label'>Description</label>
              <input type="text" className='form-control' placeholder='Enter product description' name='description' value={description} onChange={onInputChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='Price' className='form-label'>Price</label>
              <input type="number" className='form-control' placeholder='Enter product price' name='price' value={price} onChange={onInputChange} />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
            <button type='button' className='btn btn-outline-danger' onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}