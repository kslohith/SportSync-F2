import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SportsIcon from './SportsIcon';

function ItemCardJoin(props) {

  const handleClick = () => {
    console.log("Selected", props.cardItem.eventId);
    props.selectedEvent(props.cardItem);
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold" style={{ textTransform: 'uppercase', fontSize: '14px' }}>{props.cardItem.eventName}</Typography>
            </Grid>
            <Grid container xs={12} style={{marginLeft: '10px'}}>
              <Grid item xs={2}>
                <LocationOnIcon />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">{props.cardItem.venue}</Typography>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{ marginLeft: '10px'}}>
            <Grid item xs={2}><SportsIcon sport={props.cardItem.sport} /></Grid>
            <Grid item xs={9} style={{marginLeft: '4px'}}>
              <Typography variant="body1">{props.cardItem.sport}</Typography>
            </Grid>
          </Grid>
          </Grid>
          <Grid container item xs={6} spacing={2}>
            <Grid item xs={2}>
            <DateRangeIcon/>
            </Grid>
            <Grid item xs={8}>
            <Typography variant="body1" style={{ color: 'grey', fontSize: '13px', marginLeft: '4px'}}>{new Date(props.cardItem.date).toISOString().split('T')[0]}</Typography>
            <Typography variant="body1" style={{ color: 'grey', fontSize: '13px', marginLeft: '4px'}}>{new Date(props.cardItem.date).toISOString().split('T')[1].split('.')[0]}</Typography>
            </Grid>
        </Grid>
          <Grid container xs={12} style={{marginLeft: '14px'}}>
            <Grid item xs={2}>
              <ConfirmationNumberIcon />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">Slots Remaining: {props.cardItem.slotsRemaining} </Typography>
            </Grid>
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
