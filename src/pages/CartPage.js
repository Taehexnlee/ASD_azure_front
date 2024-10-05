import React from 'react';
import { useUser } from '../context/UserContext';

export default function CartPage() {
  const { cart, updateCartItemQuantity } = useUser();

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate the total quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (productId, quantity) => {
    updateCartItemQuantity(productId, quantity);
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((product) => (
              <li className="list-group-item" key={product.id}>
                <h5>{product.name}</h5>
                <p><strong>Price:</strong> ${product.price}</p>
                <div className="d-flex align-items-center">
                  <label htmlFor={`quantity-${product.id}`} className="me-2"><strong>Quantity:</strong></label>
                  <input
                    type="number"
                    id={`quantity-${product.id}`}
                    value={product.quantity}
                    min="1"
                    className="form-control w-25"
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  />
                </div>
                <p className="mt-2"><strong>Subtotal:</strong> ${product.price * product.quantity}</p>
              </li>
            ))}
          </ul>
          <h4>Total Quantity: {totalQuantity}</h4>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}
