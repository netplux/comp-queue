// frontend/src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReports(response.data.reports);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      // Handle error (e.g., redirect to login)
    }
  };

  const handleGeneratePDF = async (reportId) => {
    try {
      const response = await axios.get(`/api/reports/pdf/${reportId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/report-form')}>
        Create New Report
      </Button>
      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Report ID</TableCell>
            <TableCell>Property Address</TableCell>
            <TableCell>Report Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report._id}>
              <TableCell>{report._id}</TableCell>
              <TableCell>{report.propertyDetails.address}</TableCell>
              <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleGeneratePDF(report._id)}
                >
                  Generate PDF
                </Button>
                {/* Add more actions like Edit, Delete if needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Dashboard;
