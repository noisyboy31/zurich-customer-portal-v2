import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { TCustomerMembership } from '../../../typeModule';
import { getMemberships, maskEmail as maskEmailApi, getBalancePages } from '../../api/membershipApi';
import { RootState } from '../store';

export const ActionTypes = {
  MASK_EMAIL_SUCCESS: 'MASK_EMAIL_SUCCESS',
  FETCH_MEMBERSHIPS_REQUEST: 'FETCH_MEMBERSHIPS_REQUEST',
  FETCH_MEMBERSHIPS_SUCCESS: 'FETCH_MEMBERSHIPS_SUCCESS',
  FETCH_MEMBERSHIPS_FAILURE: 'FETCH_MEMBERSHIPS_FAILURE',
  SET_PAGE: 'SET_PAGE',
};

export const maskEmailSuccess = (email: string, maskedEmail: string) => ({
  type: ActionTypes.MASK_EMAIL_SUCCESS,
  payload: { email, maskedEmail },
});

export const fetchMembershipsRequest = () => ({
  type: ActionTypes.FETCH_MEMBERSHIPS_REQUEST,
});

export const fetchMembershipsSuccess = (memberships: TCustomerMembership[], page: number, total_pages: number) => ({
  type: ActionTypes.FETCH_MEMBERSHIPS_SUCCESS,
  payload: { memberships, page, total_pages },
});

export const fetchMembershipsFailure = (error: any) => ({
  type: ActionTypes.FETCH_MEMBERSHIPS_FAILURE,
  payload: error,
});

export const maskEmail = (email: string) => async (dispatch: Dispatch) => {
  try {
    const maskedEmail = await maskEmailApi(email);
    dispatch(maskEmailSuccess(email, maskedEmail));
  } catch (error) {
    console.error('Error masking email:', error);
    throw error;
  }
};

export const setPage = createAction<number>(ActionTypes.SET_PAGE);

export const fetchMemberships = (pageParam: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { cachedPages } = getState()?.users; 
  dispatch(fetchMembershipsRequest());

  try {
    let per_page = 6; //
    if (cachedPages[pageParam]) {
      const memberships = cachedPages[pageParam];
      dispatch(fetchMembershipsSuccess(memberships, pageParam, Math.ceil(memberships.length / per_page)));
    } else {
      const { per_page: fetchedPerPage, data, total } = await getMemberships(pageParam);
      per_page = fetchedPerPage;
      const memberships = await getBalancePages(pageParam, per_page, total, data);
      const updatedCachedPages = { ...cachedPages, [pageParam]: memberships };
      dispatch(fetchMembershipsSuccess(memberships, pageParam, Math.ceil(total / per_page)));
    }
  } catch (error) {
    console.error('Error fetching memberships:', error);
    dispatch(fetchMembershipsFailure(error));
  }
};