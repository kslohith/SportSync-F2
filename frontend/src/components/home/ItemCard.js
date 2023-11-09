import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import { ManageEventModal } from '../Manage/MangeEventModal';
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

const ItemCard = (props) => {
  const [cardItem, setCardItem] = useState(props.cardItem);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const userName = getCookieValue('user_id');

  const handleAttendeesClick = () => {
    // Navigate to the ManageEvent page with the id parameter
    navigate(`/manage-event/${cardItem.eventId}`);
  };

  const handleManageClick = () => {
    // Navigate to the ManageEvent page with the id parameter
    //navigate(`/manage-event/${cardItem.eventId}`);
    setOpenModal(true);
  };

  return (
  <React.Fragment>
  {openModal && <ManageEventModal cardItem={cardItem} openModal={openModal} setOpenModal={setOpenModal} setCardItem={setCardItem}/>}
  <Card variant="outlined" style={{ width: '100%', height: '180px' }}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={14}>
            <Typography variant="body1" fontWeight="bold" style={{ textTransform: 'uppercase', fontSize: '14px' }}>{cardItem.eventName}</Typography>
          </Grid>
          <Grid container xs={12} style={{ marginLeft: '10px', marginTop: '4px'}}>
            <Grid item xs={2}><LocationOnIcon /></Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{cardItem.venue}</Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} style={{ marginLeft: '10px'}}>
            <Grid item xs={2}><SportsIcon sport={cardItem.sport} /></Grid>
            <Grid item xs={9} style={{marginLeft: '4px'}}>
              <Typography variant="body1">{cardItem.sport}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={2}>
            <Grid item xs={2}>
            <DateRangeIcon/>
            </Grid>
            <Grid item xs={8}>
            <Typography variant="body1" style={{ color: 'grey'}}>{new Date(cardItem.date).toISOString().split('T')[0]}</Typography>
            <Typography variant="body1" style={{ color: 'grey'}}>{new Date(cardItem.date).toISOString().split('T')[1].split('.')[0]}</Typography>
            </Grid>
        </Grid>

        {userName === cardItem.organizer && <Grid container item xs={12} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleAttendeesClick}>
            Manage Attendees
          </Button>
          <Button sx={{marginLeft:'10px'}} variant="contained" color="primary" onClick={handleManageClick}>
            Edit
          </Button>
        </Grid>}
      </Grid>
    </CardContent>
  </Card>
  </React.Fragment>
  );
};

export default ItemCard;