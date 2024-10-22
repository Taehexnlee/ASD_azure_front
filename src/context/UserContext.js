import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // Store the cart items

  const login = (userInfo) => {
    const isAdmin = userInfo.name === '1234' && userInfo.username === '1234' && userInfo.email === '1234@1234';
    setUser({ ...userInfo, isAdmin });
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Clear the cart on logout
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Increase quantity if the product already exists in the cart
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product to the cart with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <UserContext.Provider value={{ user, cart, login, logout, addToCart, updateCartItemQuantity, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
};
