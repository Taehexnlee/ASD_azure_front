import React from 'react'
import { Link } from 'react-router-dom';
export default function HomePage() {
  return (
    <div>
        <Link className='btn btn-outline-primary ms-3' to="/userpage">User Page</Link>
        <Link className='btn btn-outline-primary ms-3' to="/productpage">Product Page</Link>
    </div>
    
  )
}
