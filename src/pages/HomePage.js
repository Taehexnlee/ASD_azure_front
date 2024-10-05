import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { isLoggedIn } = useUser();

  return (
    <div>
      <Link className='btn btn-outline-primary ms-3' to="/userpage">User Page</Link>
      <Link className='btn btn-outline-primary ms-3' to="/productpage">Product Page</Link>

      {isLoggedIn && (
        <Link className='btn btn-outline-primary ms-3' to="/addproduct">Add Product</Link>
      )}
    </div>
  );
}
