import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import Footer from '../../components/footer';

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2024-07-11T10:20:30');
});

describe('Footer', () => {
  it('renders the component with the current date and time', () => {
    render(<Footer />);
    
    const expectedDate = moment().format('DD MMM YYYY, h:mm:ss a');
    const text = `© ${expectedDate} Zurich Insurance Group Ltd. All rights reserved.`;

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
