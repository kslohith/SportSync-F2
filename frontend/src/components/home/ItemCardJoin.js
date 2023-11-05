import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ItemCardJoin({ title, venue, date, time, slots, eventId, selectedEvent}) {

  const handleClick = () => {
    console.log("Selected", eventId);
    selectedEvent(eventId);
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{venue}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">{date}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{time}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems="flex-end">
            <Typography variant="body1">Slots Remaining: {slots} </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Join
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
);
}

export default ItemCardJoin;
