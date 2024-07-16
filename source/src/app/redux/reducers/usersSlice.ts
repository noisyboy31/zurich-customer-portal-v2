// src/reducers/userReducer.ts

import { ActionTypes } from '../actions/userActions';
import { TCustomerMembership } from '../../../typeModule';

export interface UserState {
  memberships: TCustomerMembership[];
  maskedEmails: Record<string, boolean>
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: any;
  page: number;
  total_pages: number;
  per_page: number;
  total: number;
  cachedPages: Record<number, TCustomerMembership[]>;
}

const initialState: UserState = {
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
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.MASK_EMAIL_SUCCESS:
      return {
        ...state,
        maskedEmails: {
          ...state.maskedEmails,
          [action.payload.email]: action.payload.maskedEmail, 
        },
      };
    case ActionTypes.FETCH_MEMBERSHIPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FETCH_MEMBERSHIPS_SUCCESS:
      return {
        ...state,
        memberships: action.payload.memberships,
        loading: false,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        cachedPages: {
          ...state.cachedPages,
          [action.payload.page]: action.payload.memberships,
        },
      };
    case ActionTypes.FETCH_MEMBERSHIPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
