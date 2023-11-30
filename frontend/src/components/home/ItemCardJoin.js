import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SportsIcon from './SportsIcon';

function getCookieValue(key) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + '=')) {
      return decodeURIComponent(cookie.substring(key.length + 1));
    }
  }
  return null;
}

function translateSkill(skill) {
  if (skill === "Beginner") return "Learning";
  if (skill === "Intermidiate") return "Casual";
  if (skill === "Advanced") return "Competitive";
}
function ItemCardJoin(props) {

  const userName = getCookieValue('user_id');
  var text = "Join";
  var bcolor = "secondary";
  var joinable = true; 
  const handleClick = () => {
    console.log("Selected", props.cardItem.eventId);
    // if (bcolor === 'primary') {
    //   props.setAction(0);
    // } else {
    //   if (text === 'Leave') props.setAction(1);
    //   else props.setAction(2);
    // }
    props.selectedEvent(props.cardItem);
  }
  
  if (props.cardItem.slotsRemaining <= 0) {
    joinable = false; 
  } else {
    bcolor = "primary";
    text = (props.cardItem.isPrivate) ? "Request" : "Join";
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
            <Typography variant="body1" style={{ color: 'grey', fontSize: '13px', marginLeft: '4px'}}>{new Date(props.cardItem.date).toLocaleDateString()}</Typography>
            <Typography variant="body1" style={{ color: 'grey', fontSize: '13px', marginLeft: '4px'}}>{new Date(props.cardItem.date).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</Typography>
            </Grid>
        </Grid>
          <Grid container xs={12} style={{marginLeft: '14px'}}>
            <Grid item xs={10}>
              <Typography variant="body1">Slots Remaining: {props.cardItem.slotsRemaining} </Typography>
              <Typography variant="body1">Skill: { (props.ABmode) ? translateSkill(props.cardItem.eventSkill) : props.cardItem.eventSkill}</Typography>
              {(props.ABmode) && <Typography variant="body1">Host: {props.cardItem.organizer.substring(0,props.cardItem.organizer.indexOf('@'))}</Typography>}
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
          {joinable ? (
              <Button variant="contained" color={bcolor} onClick={handleClick}>
                {text}
              </Button>
            ) : (
              <Button variant="contained" color="primary" disabled>
                FULL
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
);
}

export default ItemCardJoin;
