import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const RequesteeBox = ({ attendeeName, onDenyClick, onAcceptClick}) => {

  const deny = () => {
    onDenyClick(attendeeName);
  }

  const accept = () => {
    onAcceptClick(attendeeName);
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1">{attendeeName}</Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button variant="outlined" color="success" onClick={accept}>
              Accept
            </Button>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={deny}>
              Deny
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RequesteeBox;