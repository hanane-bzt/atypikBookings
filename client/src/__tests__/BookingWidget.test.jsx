import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingWidget from '../components/ui/BookingWidget';
import { useAuth } from '../../hooks';
import axiosInstance from '@/utils/axios';
import { MemoryRouter, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Mock dependencies
vi.mock('../../hooks', () => ({
  useAuth: vi.fn(),
}));
vi.mock('@/utils/axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: vi.fn(),
  };
});
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));
vi.mock('../components/ui/DatePickerWithRange', () => ({
  __esModule: true,
  default: ({ setDateRange }) => <div data-testid="date-picker"></div>,
}));

describe('BookingWidget', () => {
  const place = {
    _id: '1',
    price: 100,
    maxGuests: 4,
  };

  beforeEach(() => {
    useAuth.mockReturnValue({ user: { name: 'Test User' } });
    axiosInstance.post.mockResolvedValue({ data: { booking: { _id: '123' } } });
    toast.error.mockClear();
    toast.success.mockClear();
    Navigate.mockClear();
  });

  it('should render correctly with initial data', () => {
    render(
      <MemoryRouter>
        <BookingWidget place={place} />
      </MemoryRouter>
    );

    const priceElement = screen.getByText(/Price:/i);
    expect(priceElement).toHaveTextContent('Price: 100€ / per night');
    expect(screen.getByLabelText('Number of guests:')).toBeInTheDocument();
    expect(screen.getByLabelText('Your full name:')).toHaveValue('Test User');
    expect(screen.getByLabelText('Phone number:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book this place/i })).toBeInTheDocument();
  });

  it('should show validation error if dates are not selected', () => {
    render(
      <MemoryRouter>
        <BookingWidget place={place} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Book this place/i }));

    expect(toast.error).toHaveBeenCalledWith('Please select valid dates');
  });
});
