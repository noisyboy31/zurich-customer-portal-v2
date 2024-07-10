import React from 'react';
import { AppBar, Typography, IconButton } from '@mui/material';
import { ToolbarStyled, StyledFooter, StyledBox } from '../styles/useStyles';
import moment, { Moment } from "moment";

const Footer = () => {
  const date: Moment = moment();

  return (
    <StyledFooter>
      <StyledBox>
        <Typography variant="h6" >
          &copy; {date.format('DD MMM YYYY, h:mm:ss a')} Zurich Insurance Group Ltd. All rights reserved.
        </Typography>
      </StyledBox>
    </StyledFooter>
  );
}

export default Footer;
