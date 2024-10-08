import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductPage from './pages/ProductPage';
import { UserProvider } from './context/UserContext';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock the axios module
jest.mock('axios');

const mockProduct = [
  { id: 1, name: 'Spaghetti Bolognese', description: 'Classic Italian pasta', price: 12.99, category: 'Main Courses' },
];

test('renders product page with a single product', async () => {
  // Mock the API call to return the sample product
  axios.get.mockResolvedValue({ data: mockProduct });

  // Render the component within MemoryRouter and UserProvider to provide necessary contexts
  render(
    <MemoryRouter>
      <UserProvider value={{ user: { isAdmin: true } }}> {/* Provide a mock admin user */}
        <ProductPage />
      </UserProvider>
    </MemoryRouter>
  );

  // Wait for the product to load and be rendered
  await waitFor(() => {
    expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
  });
});