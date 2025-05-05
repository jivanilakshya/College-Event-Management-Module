import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Event as EventIcon, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={4} sx={{ background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <EventIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700, letterSpacing: 1 }}
            onClick={() => navigate('/')}
          >
            College Events
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => navigate('/create')}
              sx={{ ml: 2, borderRadius: 2, fontWeight: 600, borderColor: '#fff', color: '#fff', '&:hover': { background: '#fff', color: '#1976d2', borderColor: '#1976d2' } }}
            >
              Create Event
            </Button>
            <IconButton color="inherit" onClick={() => navigate('/profile')} sx={{ ml: 1 }}>
              <Avatar sx={{ bgcolor: '#fff', color: '#1976d2', width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 