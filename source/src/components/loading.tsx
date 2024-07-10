import React from 'react';
import { CircularProgress } from '@mui/material';
import { FullScreenContainer } from '../styles/useStyles';

const LoadingComponent = () => {
  return (
    <FullScreenContainer>
      <CircularProgress />
    </FullScreenContainer>
  )
};

export default LoadingComponent;