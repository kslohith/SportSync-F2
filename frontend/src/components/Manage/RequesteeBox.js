import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const RequesteeBox = ({ attendeeName, onDenyClick, onAcceptClick }) => {

  const deny = () => {
    onDenyClick(attendeeName);
  }

  const accept = () => {
    onAcceptClick(attendeeName);
  }

  return (
    <Card variant="outlined" style={{ minWidth: 275, margin: '16px', padding: '8px' }}>
      <CardContent>
        <Typography variant="h6">{attendeeName}</Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={accept}>
            Accept
          </Button>
          <Button variant="contained" color="secondary" onClick={deny}>
            Deny
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RequesteeBox;
