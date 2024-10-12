// frontend/src/pages/ReportForm.jsx

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportForm() {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [preparedFor, setPreparedFor] = useState('');
  const [reportDate, setReportDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('propertyType', propertyType);
    formData.append('address', address);
    formData.append('image', image);
    formData.append('preparedFor', preparedFor);
    formData.append('reportDate', reportDate);

    try {
      // Send data to backend
      await axios.post('/api/reports/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Report creation failed:', err);
      // Handle error (e.g., show notification)
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create New Report
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Property Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                required
              >
                <MenuItem value="Single Family Residence">Single Family Residence</MenuItem>
                <MenuItem value="Condominium">Condominium</MenuItem>
                <MenuItem value="Multi-Family">Multi-Family</MenuItem>
                <MenuItem value="Commercial">Commercial</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Property Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              fullWidth
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Property Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>
            {image && <Typography>{image.name}</Typography>}
          </Grid>

          {/* Prepared For */}
          <Grid item xs={12}>
            <TextField
              label="Prepared For"
              value={preparedFor}
              onChange={(e) => setPreparedFor(e.target.value)}
              required
              fullWidth
            />
          </Grid>

          {/* Report Date */}
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Report Date"
              inputFormat="MM/dd/yyyy"
              value={reportDate}
              onChange={(newDate) => setReportDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ReportForm;
