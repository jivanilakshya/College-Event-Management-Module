import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  CardActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 8, borderColor: '#1976d2' } }}>
              {event.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image.startsWith('http') ? event.image : `http://localhost:5000/${event.image}`}
                  alt={event.title}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {event.description.length > 80 ? event.description.slice(0, 80) + '...' : event.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.date} | {event.location}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
                <IconButton color="primary" onClick={() => handleViewDetails(event)}><Visibility /></IconButton>
                <IconButton color="secondary" href={`/edit/${event._id}`}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(event._id)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedEvent && (
          <>
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogContent>
              {selectedEvent?.image && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={selectedEvent.image.startsWith('http') ? selectedEvent.image : `http://localhost:5000/${selectedEvent.image}`}
                    alt={selectedEvent.title}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {selectedEvent.image.split('/').pop()}
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedEvent?.description}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {selectedEvent?.eventType}<br />
                Date: {selectedEvent?.date}<br />
                Location: {selectedEvent?.location}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default EventList; 