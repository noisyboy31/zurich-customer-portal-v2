import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingComponent from '../../components/loading';

describe('LoadingComponent', () => {
  it('renders the loading component with CircularProgress', () => {
    render(<LoadingComponent />);
    
    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
    expect(circularProgress).toHaveClass('MuiCircularProgress-root');
  });

  it('renders inside a FullScreenContainer', () => {
    render(<LoadingComponent />);
    
    const fullScreenContainer = screen.getByTestId('full-screen-container');
    expect(fullScreenContainer).toBeInTheDocument();
    expect(fullScreenContainer).toHaveStyle({
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'background.default'
    });
  });
});
