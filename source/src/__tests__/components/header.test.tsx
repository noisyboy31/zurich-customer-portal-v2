import { render, screen, fireEvent } from '@testing-library/react';

import { signOut } from 'next-auth/react';
import '@testing-library/jest-dom';
import Header from '../../components/header';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('Header', () => {
  it('renders the component with the title and sign-out button', () => {
    render(<Header />);
    
    expect(screen.getByText('Zurich Customer Portal')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-button')).toBeInTheDocument(); // Assuming IconButton has a data-testid
    
    // Mock sign-out function
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    expect(signOut).toHaveBeenCalled();
  });
});
