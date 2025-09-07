import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/ui/Header';
import { useAuth } from '../../hooks';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@radix-ui/react-avatar', () => ({
  Avatar: ({ children }) => <div>{children}</div>,
  AvatarImage: ({ src, ...props }) => <img src={src} {...props} />,
  AvatarFallback: ({ children }) => <div>{children}</div>,
}));

// Mock the useAuth hook
vi.mock('../../hooks', () => ({
  useAuth: vi.fn(),
  usePlaces: vi.fn(() => ({})),
}));

describe('Header', () => {
  it('should render the logo and login link when not authenticated', () => {
    // Arrange
    useAuth.mockReturnValue({ user: null });

    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Assert
    const logo = screen.getByAltText('AtypikHouse Logo');
    expect(logo).toBeInTheDocument();

    const loginLink = screen.getByTestId('login-link');
    expect(loginLink).toBeInTheDocument();
  });

  it('should render the user avatar when authenticated', () => {
    // Arrange
    useAuth.mockReturnValue({ user: { picture: 'test.jpg' } });

    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Assert
    const images = screen.getAllByRole('img');
    const avatar = images.find(img => img.src.endsWith('test.jpg'));
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'test.jpg');
  });
});
