import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            College Events
          </Typography>
          <Button
            component={RouterLink}
            to="/create"
            color="inherit"
            startIcon={<AddIcon />}
          >
            Create Event
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 