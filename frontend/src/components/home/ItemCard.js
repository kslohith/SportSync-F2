import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ title, eventId, venue, date, time }) => {

  const navigate = useNavigate();

  const handleManageClick = () => {
    // Navigate to the ManageEvent page with the id parameter
    navigate(`/manage-event/${eventId}`);
  };

  return (
    <Card variant="outlined" style={{ width: '315px', height: '180px' }}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={14}>
            <Typography variant="body1" fontWeight="bold" style={{ textTransform: 'uppercase', fontSize: '14px' }}>{title}</Typography>
          </Grid>
          <Grid container xs={12} style={{ marginLeft: '10px'}}>
            <Grid item xs={2}><LocationOnIcon /></Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{venue}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={2}>
            <Grid item xs={2}>
            <DateRangeIcon/>
            </Grid>
            <Grid item xs={8}>
            <Typography variant="body1" style={{ color: 'grey'}}>{date}</Typography>
            <Typography variant="body1" style={{ color: 'grey'}}>{time}</Typography>
            </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleManageClick}>
            Manage
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default ItemCard;