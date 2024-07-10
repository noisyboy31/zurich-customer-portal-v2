import { styled } from '@mui/material/styles';
import { 
  ListItem, ListItemAvatar, Avatar, ListItemText, Button, Box, Typography, Container, Toolbar,
} from '@mui/material';

export const ListItemStyled = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: theme.spacing(4),
}));

export const AvatarStyled = styled(ListItemAvatar)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const DetailsStyled = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  padding: (theme) => theme.spacing(3, 0),
  marginTop: 'auto',
}));

export const ContainerStyled = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: (theme) => theme.spacing(8),
  padding: (theme) => theme.spacing(2),
}));

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
}));

export const FullScreenContainer = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  height: '4rem',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
}));

export const StyledFooter = styled('footer')({
  bottom: '0px',
  position: 'fixed',
  width: '100%',
  right: '0px',
  left: '0px'
});

