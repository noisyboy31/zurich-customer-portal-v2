
"use client";
import * as React from 'react';
import { Container, Box, List, ListItem, Typography } from '@mui/material';
import CustomerMembership from '../../components/customerMembership';
import { maskEmail } from '../api/membershipApi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMemberships, setPage } from '../redux/actions/userActions';
import { RootState, AppDispatch } from '../redux/store';
import { TCustomerMembership } from '../../typeModule';
import { StyledButton } from '../../styles/useStyles';

const Membership = () => {
  const dispatch = useDispatch<AppDispatch>();
  const memberships = useSelector((state: RootState) => state?.users?.memberships || []);
  const loading = useSelector((state: RootState) => state?.users?.loading);
  const error = useSelector((state: RootState) => state?.users?.error);
  const totalPages = useSelector((state: RootState) => state.users.total_pages);
  const page = useSelector((state: RootState) => state?.users?.page); 

  React.useEffect(() => {
    dispatch(fetchMemberships(page));
  }, [page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchMemberships(newPage));
    }
  };

  return (
    <Container sx={{ p: 4, mb: 16 }}>
      <Box>
        <List sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
          {memberships?.map((membership: TCustomerMembership) => (
            <ListItem key={membership?.id} sx={{ flex: '0 0 auto', maxWidth: '310px' }}>
              <CustomerMembership {...membership} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="flex items-center justify-between mt-10">
        <StyledButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</StyledButton>
        <Typography className="text-gray-800"> Page {page} of {totalPages}</Typography>
        <StyledButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</StyledButton>
      </Box>
    </Container>
  );
}

export default Membership;