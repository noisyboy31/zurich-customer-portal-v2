"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Box, Typography, Button, ListItem, Avatar, Card, CardMedia, CardContent } from '@mui/material';
import { TCustomerMembershipProps } from '../typeModule';

const CustomerMembership = ({ id, email, first_name, last_name, avatar, maskEmail }: TCustomerMembershipProps) => {
  const [masked, setMasked] = useState<boolean>(true);
  const [maskedEmail, setMaskedEmail] = useState<string>('');
  const handleToggleMask = () => setMasked(!masked);

  const latestMaskedEmail = async () => {
    if (masked) {
      const maskedEmail = await maskEmail(email);
      setMaskedEmail(maskedEmail);
    }
    setMaskedEmail(email);
  };

  useEffect(() => {
    latestMaskedEmail();
  }, [masked, email, maskEmail]);

  return (
    <ListItem sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 4 }}>
      <Card sx={{minWidth: 200, display: 'flex'}}>
        <Box sx={{ m: 1 }}>
          <CardMedia
            component="img"
            height="194"
            image={avatar}
            alt={`${first_name} ${last_name}`} 
          />
        </Box>
        <CardContent>
          <Typography>Name: {first_name} {last_name}</Typography>
          <Typography>Email: {masked ? '********' : maskedEmail}</Typography>
          <Button onClick={handleToggleMask}>
            <FontAwesomeIcon icon={masked ? faEye : faEyeSlash} />
          </Button>
        </CardContent>
      </Card>
    </ListItem>
  );
}

export default CustomerMembership;