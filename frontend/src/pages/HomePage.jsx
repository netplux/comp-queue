import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';

function HomePage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleProceed = () => {
    navigate('/property-form', { state: { address } });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>comp-queue</h1>
      <Autocomplete>
        <TextField
          label="Enter property address to get started:"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
        />
      </Autocomplete>
      <Button variant="contained" color="primary" onClick={handleProceed}>
        Proceed
      </Button>
    </div>
  );
}

export default HomePage;
