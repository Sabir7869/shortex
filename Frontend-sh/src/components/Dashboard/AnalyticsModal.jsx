import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';

const AnalyticsModal = ({ open, onClose, shortUrl, createdDate }) => {
  const { token } = useStoreContext();
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Format created date to YYYY-MM-DD
  const startDate = new Date(createdDate).toISOString().split('T')[0];

  const fetchAnalytics = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const startDateTime = `${startDate}T00:00`;
      const endDateTime = `${endDate}T23:59:59`;
      
      const response = await api.get(
        `/api/urls/analytics/${shortUrl}?startDate=${startDateTime}&EndDate=${endDateTime}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      
      // Transform data for table display
      const transformedData = response.data.map((item, index) => ({
        id: index + 1,
        dateTime: new Date(item.clickDate).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      }));
      
      setAnalyticsData(transformedData);
    } catch {
      setAnalyticsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnalyticsData([]);
    setHasSearched(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Analytics for: {shortUrl}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Link created on: {new Date(createdDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              disabled
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Button 
              variant="contained" 
              onClick={fetchAnalytics}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Analytics'}
            </Button>
          </Box>
        </Box>

        {hasSearched && (
          <Box sx={{ height: 400, width: '100%' }}>
            {analyticsData.length > 0 ? (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Clicks: {analyticsData.length}
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.dateTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%',
                flexDirection: 'column'
              }}>
                <Typography variant="h6" color="text.secondary">
                  No analytics data found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  This link has not been clicked in the selected date range
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsModal;
