import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/lab';

function PropertyForm() {
  const location = useLocation();
  const [propertyType, setPropertyType] = useState('');
  const [image, setImage] = useState(null);
  const [preparedFor, setPreparedFor] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <TextField
        label="Property Address"
        value={location.state.address}
        disabled
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <TextField
        label="Prepared For"
        value={preparedFor}
        onChange={(e) => setPreparedFor(e.target.value)}
        required
      />
      <DatePicker
        label="Report Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
      />
      {/* Prepared By section can be auto-filled from user profile */}
      <Button type="submit">Next</Button>
    </form>
  );
}

export default PropertyForm;
