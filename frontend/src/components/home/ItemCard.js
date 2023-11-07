import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ title, eventId, venue, date, time }) => {

  const navigate = useNavigate();

  const handleManageClick = () => {
    // Navigate to the ManageEvent page with the id parameter
    navigate(`/manage-event/${eventId}`);
  };

  return (
    <Card variant="outlined">
    <CardContent>
      <Grid container spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={14}>
            <Typography variant="body1">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{venue}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={10}>
            <Typography variant="body1">{date}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{time}</Typography>
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
