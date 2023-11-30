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
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';

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

const boxstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow:'scroll',
  bgcolor: 'white',
  border: '2px solid #000',
  padding: '15px',
  borderRadius: '2%'
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function translateSkill(skill) {
  if (skill === "Beginner") return "Learning";
  if (skill === "Intermidiate") return "Casual";
  if (skill === "Advanced") return "Competitive";
}

const ItemCard = (props) => {
  const [cardItem, setCardItem] = useState(props.cardItem);
  const [openModal, setOpenModal] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
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

  const handleLeaveClick = () => {
    setShowLeave(true);
  }

  const handleUnrequest = (leave) => {
    if (leave) {
      axios({
        method:'post',
        url: `https://sportssync-backend.onrender.com/event?eventId=${cardItem.eventId}`, 
        headers: {},
        data: {
          requestedAttendees: {
            op: 'remove',
            list: [userName]
          }
        }
      })
      .then((response) => {
        setShowLeave(false);
        setAlertOpen(true);
        setRemoved(true);
        console.log(response);
      })
      .catch((error) => {
        setShowLeave(false);
        console.log(error);
      });
    } else {
      setShowLeave(false);
    }
  }


  const handleLeave = (leave) => {
    if (leave) {
      axios({
        method:'post',
        url: `https://sportssync-backend.onrender.com/event?eventId=${cardItem.eventId}`, 
        headers: {},
        data: {
          attendees: {
            op: 'remove',
            list: [userName]
          }
        }
      })
      .then((response) => {
        setShowLeave(false);
        setAlertOpen(true);
        setRemoved(true);
      })
      .catch((error) => {
        setShowLeave(false);
      });
    } else {
      setShowLeave(false);
    }
  }

  return (
  <React.Fragment>
  {openModal && <ManageEventModal cardItem={cardItem} openModal={openModal} setOpenModal={setOpenModal} setCardItem={setCardItem}/>}
  {showLeave && 
    <Modal open={showLeave} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={boxstyle}>
        <Grid container spacing={2}>
          <Grid item><Typography>Are you sure you want to leave?</Typography></Grid>
          <Grid item><Button variant="contained" color="secondary" onClick={()=>(props.ctype == 1) ? handleLeave(true) : handleUnrequest(true)}>Leave</Button></Grid>
          <Grid item><Button color="primary" onClick={()=>(props.ctype == 1) ? handleLeave(false) : handleUnrequest(false)}>Cancel</Button></Grid>
        </Grid>
      </Box>
    </Modal>
  }
  {!removed && <Card variant="outlined" style={{ width: '100%'}}>
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
          <Typography variant="body1">Skill: { (props.ABmode) ? translateSkill(props.cardItem.eventSkill) : props.cardItem.eventSkill}</Typography>
          {(props.ABmode) && <Typography variant="body1">Host: {props.cardItem.organizer.substring(0,props.cardItem.organizer.indexOf('@'))}</Typography>}
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={2}>
        <Grid item xs={2}>
          <DateRangeIcon/>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" style={{ color: 'grey'}}>{new Date(cardItem.date).toLocaleDateString()}</Typography>
          <Typography variant="body1" style={{ color: 'grey'}}>{new Date(cardItem.date).toLocaleTimeString()}</Typography>
        </Grid>
      </Grid>
        {(userName === cardItem.organizer) ? <Grid container item xs={12} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleAttendeesClick}>
            Manage 
          </Button>
          <Button sx={{marginLeft:'10px'}} variant="contained" color="primary" onClick={handleManageClick}>
            Edit
          </Button>
        </Grid> : <Grid container item xs={12} justifyContent="flex-end">
          <Button sx={{marginLeft:'10px'}} variant="contained" color="secondary" onClick={handleLeaveClick}>
            {(props.ctype == 1) ? 'Leave' : 'Un-request'}
          </Button>
        </Grid>}
      </Grid>
    </CardContent>
  </Card>}

  <Snackbar open={alertOpen} autoHideDuration={6000} onClose={()=>setAlertOpen(false)}>
        <Alert onClose={()=>setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          Succesfully left event
        </Alert>
  </Snackbar>

  </React.Fragment>
  );
};

export default ItemCard;