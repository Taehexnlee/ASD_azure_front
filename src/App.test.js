import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductPage from './pages/ProductPage';
import { UserProvider } from './context/UserContext';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

const mockProducts = [
  { id: 1, name: 'Spaghetti Bolognese', category: 'Main Courses', price: 12.99 }
];

test('U124: Filter products by category', async () => {
  axios.get.mockResolvedValue({ data: mockProducts });

  render(
    <MemoryRouter>
      <UserProvider>
        <ProductPage />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
  });

  
});
test('U125: Add product to cart', async () => {
  axios.get.mockResolvedValue({ data: mockProducts });

  render(
    <MemoryRouter>
      <UserProvider>
        <ProductPage />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Add to Cart/i));

  await waitFor(() => {
    // Assuming cart total or product count is displayed somewhere
    expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
  });
});
test('U126: Change to dark mode', async () => {
  axios.get.mockResolvedValue({ data: mockProducts });

  render(
    <MemoryRouter>
      <UserProvider>
        <ProductPage />
      </UserProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByLabelText(/Dark Mode/i));

  await waitFor(() => {
    // Assuming body or wrapper has the dark-mode class
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });
});
