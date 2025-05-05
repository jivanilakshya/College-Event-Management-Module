import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';

const eventTypes = [
  'Seminar',
  'Workshop',
  'Cultural',
  'Sports',
  'Other',
];

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    location: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      await eventService.createEvent(formData);
      setSuccess('Event created successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to event list
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to create event');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Create New Event
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Type"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {eventTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#1565c0' } }}
          >
            Upload Image
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>
          {form.image && (
            <Box sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Selected file: {form.image.name}
              </Typography>
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 180, marginTop: 8, borderRadius: 8 }}
              />
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 1, fontWeight: 'bold', fontSize: '1.1rem', boxShadow: 2 }}
          >
            {loading ? 'Submitting...' : 'Create Event'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent; 