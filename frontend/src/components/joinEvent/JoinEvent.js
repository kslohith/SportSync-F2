import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Container, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../createEvent/Datepicker';
import axios from "axios";
import ItemCardJoin from '../home/ItemCardJoin';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { logEvent } from "firebase/analytics";
import analytics from "../../config/firebaseConfig";
import { useOutletContext } from 'react-router-dom';

const sportsData = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball'];


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  }, 
}));

function getCookieValue(key) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(key + '=')) {
        return decodeURIComponent(cookie.substring(key.length + 1));
      }
    }
    return null; // Return null if the cookie with the given key is not found
}

function FilteredCardList() {
  const [ABmode, setABmode] = useOutletContext();
  const [joinedEvent, setJoinedEvent] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [userDetails, setUserDetails] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  const [selectedJoinEvent, setSelectedJoinEvent] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => {
    setSelectedJoinEvent('');
    setShowPopup(false);
  };
  useEffect(() => {
    setShowLoading(true);
    const userName = getCookieValue('user_id')
    if (userName) {
        axios.get(`https://sportssync-backend.onrender.com/getAllEvents`)
        .then((response) => {
            setShowLoading(false);
            setUserDetails(response.data.data); // Access the "data" field
        })
        .catch((error) => {
            setShowLoading(false);
            console.log(error);
        });
    }
  },[]);

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const getEventDetails = () => {
    const filteredData = userDetails.filter(item => item.eventId === selectedJoinEvent);
    setJoinedEvent(filteredData);
  }

  useEffect(() => {
    const userName = getCookieValue('user_id')
    logEvent(analytics, 'user_landed_join_event', {
        user_email: {userName}
    });
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'join_event', 
      firebase_screen_class: ''
    });
    if(selectedJoinEvent.length > 0){
      getEventDetails();
      setShowPopup(true);
    }
  },[selectedJoinEvent]);

  const handleJoinEvent = (eventId) => {
    const userName = getCookieValue('user_id')
    logEvent(analytics, 'user_joined_event', {
        user_email: {userName}
    });
    if(eventId?.length > 0){
      console.log("Inside join select");
      joinedEvent[0]?.requestedAttendees.push(getCookieValue('user_id'));
      console.log(joinedEvent,selectedJoinEvent);
      setShowLoading(true);
      axios.post(`https://sportssync-backend.onrender.com/event`,joinedEvent[0],{
        params: {eventId: selectedJoinEvent}
      })
      .then((response) => {
              setShowLoading(false);
              setShowPopup(false);
              setAlertOpen(true);
      })
      .catch((error) => {
              setShowLoading(false);
              console.log(error);
              setShowPopup(false);
      });
    }
  }


  const handleAlertClose = () => {
    setAlertOpen(false);
  }

  return (
    <Container>
      <Box my={3}>
      <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item xs={6} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="sport-filter">Sport</InputLabel>
            <Select
              value={selectedSport}
              onChange={handleSportChange}
              label="Sport"
              id="sport-filter"
            >
              <MenuItem value="">All</MenuItem>
              {sportsData.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Datepicker
            selectedDateRange={selectedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </Grid>
      </Grid>
    </Box>
      {showLoading && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
      }

      {/* Example Card */}
      {!showLoading && 
                <>
                <Grid container spacing={2}>
                    {userDetails.map((item, index) => {
                        if (ABmode && item.isPrivate == false) return (<React.Fragment key={index}></React.Fragment>);
                        return (<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ItemCardJoin title={item.eventName} venue={item.venue} date={new Date(item.date).toISOString().split('T')[0]} time={new Date(item.date).toISOString().split('T')[1].split('.')[0]} slots={item.slotsRemaining} eventId={item.eventId} selectedEvent={setSelectedJoinEvent} />
                        </Grid>);
                    })}
                </Grid>
                <br></br>
                <br></br>
                </>
            }

      <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showPopup}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {joinedEvent[0]?.eventName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Sport: {joinedEvent[0]?.sport}
          </Typography>
          <Typography gutterBottom>
            Venue: {joinedEvent[0]?.venue}
          </Typography>
          <Typography gutterBottom>
            Slots Remaining: {joinedEvent[0]?.slotsRemaining}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {handleJoinEvent(joinedEvent[0]?.eventId)}}>
            Request to Join
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Successfully Sent Request to Join the game !
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FilteredCardList;
