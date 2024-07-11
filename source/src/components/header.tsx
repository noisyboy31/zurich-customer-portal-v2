"use client";
import React from 'react';
import { AppBar, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';
import { ToolbarStyled } from '../styles/useStyles';

const Header = () => {
  const title = { flexGrow: 1, textAlign: 'left'}

  return (
    <AppBar position="static">
      <ToolbarStyled data-testid="header-component">
        <Typography variant="h6" sx={title}>
            Zurich Customer Portal
        </Typography>
        <IconButton color="inherit" data-testid="sign-out-button" onClick={() => signOut()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </IconButton>
      </ToolbarStyled>
    </AppBar>
  );
}

export default Header;