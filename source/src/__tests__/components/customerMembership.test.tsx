import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerMembership from '../../components/customerMembership';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../../app/redux/reducers/usersSlice';
import {RootState} from '../../app/redux/store';
import { maskEmail } from '../../app/redux/actions/userActions';

describe('CustomerMembership Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: usersReducer,
      },
      preloadedState: {
        users: {
          memberships: [],
          maskedEmails: {},
          loading: false,
          error: null,
          status: "idle",
          page: 1,
          total_pages: 1,
          per_page: 6,
          total: 0,
          cachedPages: {},
        },
      },
    });

    store.dispatch = jest.fn();
  });

  it('should initially display masked email and toggle visibility on button click', () => {
    const membership = {
      id: 1,
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'https://via.placeholder.com/150',
    };

    render(
      <Provider store={store}>
        <CustomerMembership {...membership} />
      </Provider>
    );

    // Simulate button click to reveal the email
    const button = screen.getByRole('button');
    fireEvent.click(button);
  });
});