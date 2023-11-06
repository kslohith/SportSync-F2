import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const AttendeeBox = ({attendeeName}) => {
  return (
    <Card variant="outlined">
    <CardContent>
      <Grid container spacing={0}>
        <Grid container item xs={6} spacing={1}>
          <Grid item xs={14}>
            <Typography variant="body1">{attendeeName}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="end">
          <Button variant="outlined" color="error">
            Remove
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default AttendeeBox;
