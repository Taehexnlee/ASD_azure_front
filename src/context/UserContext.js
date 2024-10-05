import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details, including the type

  const login = (userInfo) => {
    const isAdmin = userInfo.name === '1234' && userInfo.username === '1234' && userInfo.email === '1234';
    setUser({ ...userInfo, isAdmin });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
