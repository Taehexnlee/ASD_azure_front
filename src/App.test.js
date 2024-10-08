import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductPage from './pages/ProductPage';
import { UserProvider } from './context/UserContext'; // Import the context provider

test('renders product page', () => {
    render(
        <UserProvider> {/* Wrap component in context provider */}
            <ProductPage />
        </UserProvider>
    );
    const linkElement = screen.getByText(/Product Page/i);
    expect(linkElement).toBeInTheDocument();
});
