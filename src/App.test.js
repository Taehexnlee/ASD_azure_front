import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ProductPage from './ProductPage';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders product page', () => {
    render(<ProductPage />);
    const linkElement = screen.getByText(/Product Page/i);
    expect(linkElement).toBeInTheDocument();
});
