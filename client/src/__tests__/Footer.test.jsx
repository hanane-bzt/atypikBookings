import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/ui/Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  it('should render the main sections and copyright', () => {
    // Act
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Hosting')).toBeInTheDocument();
    expect(screen.getByText('AtypikHouse')).toBeInTheDocument();
    expect(screen.getByText(/2025 AtypikHouse. Tous droits réservés./i)).toBeInTheDocument();
  });
});
