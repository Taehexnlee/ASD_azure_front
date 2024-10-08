import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {

  let navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category:""
  });

  const { name, description, price, category } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/product/${id}`);
    setProduct(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/product/${id}`, product);
    navigate("/productpage");
  };

  const onCancel = () => {
    navigate("/productpage");
  };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Update Product</h2>

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
        <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={product.category}
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
        <button type='submit' className='btn btn-outline-primary'>Submit</button>
        <button type='button' className='btn btn-outline-danger' onClick={onCancel}>Cancel</button>
      </form>
    </div>
  </div>
</div>
);
}