import React from 'react';
import { CircularProgress } from '@mui/material';
import { FullScreenContainer } from '../styles/useStyles';

const LoadingComponent = () => {
  return (
    <FullScreenContainer data-testid="full-screen-container">
      <CircularProgress />
    </FullScreenContainer>
  )
};

export default LoadingComponent;