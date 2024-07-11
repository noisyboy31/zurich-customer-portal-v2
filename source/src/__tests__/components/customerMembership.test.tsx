import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerMembership from '../../components/customerMembership';

export type TCustomerMembership = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type TCustomerMembershipProps = TCustomerMembership & { maskEmail: (email: string) => Promise<string> };

// Mock the maskEmail function
const mockMaskEmail = jest.fn(async (email) => {
  return '********';
});

const props: TCustomerMembershipProps = {
  id: 1,
  email: 'test@example.com',
  first_name: 'George',
  last_name: 'Bluth',
  avatar: 'https://via.placeholder.com/1',
  maskEmail: mockMaskEmail,
};

describe('CustomerMembership', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the given props', () => {
    render(<CustomerMembership {...props} />);
    expect(screen.getByText('Name: George Bluth')).toBeInTheDocument();
    expect(screen.getByText('Email: ********')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('George Bluth')).toBeInTheDocument();
  });

  it('toggles email masking when the button is clicked', async () => {
    render(<CustomerMembership {...props} />);
    const button = screen.getByRole('button');
    
    expect(screen.getByText('Email: ********')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });
    expect(await screen.findByText('Email: test@example.com')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });
    expect(await screen.findByText('Email: ********')).toBeInTheDocument();
  });

  it('calls the maskEmail function when masking is enabled', async () => {
    render(<CustomerMembership {...props} />);
    expect(mockMaskEmail).toHaveBeenCalledWith('test@example.com');
  });
});
