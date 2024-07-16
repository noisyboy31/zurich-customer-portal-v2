"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Box, Typography, Button, ListItem, Avatar, Card, CardMedia, CardContent } from '@mui/material';
import { TCustomerMembership } from '../typeModule';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../app/redux/store';
import { maskEmail } from '../app/redux/actions/userActions';

const CustomerMembership = ({ id, email, first_name, last_name, avatar }: TCustomerMembership) => {
  const dispatch = useDispatch<AppDispatch>();
  const maskedEmail = useSelector((state: RootState) => state.users.maskedEmails[email]);

  const handleToggleMask = () => {
    if (!maskedEmail) {
      dispatch(maskEmail(email));
    }
  };

  return (
    <Card sx={{ minWidth: 300, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Box sx={{ m: 1 }}>
        <CardMedia
          component="img"
          height="194"
          image={avatar}
          alt={`${first_name} ${last_name}`} 
        />
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Typography>Name: {first_name} {last_name}</Typography>
          <Typography>Email: {maskedEmail ? email : '**********'}</Typography>
          <Button onClick={handleToggleMask}>
            <FontAwesomeIcon icon={maskedEmail ? faEye : faEyeSlash} />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
} 

export default CustomerMembership;