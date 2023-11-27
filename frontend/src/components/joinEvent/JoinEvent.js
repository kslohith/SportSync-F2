import React, { useState, useEffect } from 'react';
import {Grid, Typography, Container, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

const sportsData = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball', 'Badminton', 'Squash', 'Golf', 'Fencing'];

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
  return null;
}


const getFormattedDate = (inputDate) => {
  var year = inputDate.getFullYear();
  var month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  var day = inputDate.getDate().toString().padStart(2, '0');
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

function FilteredCardList() {
  const [ABmode, setABmode] = useOutletContext();
  //const [joinedEvent, setJoinedEvent] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userDetails, setUserDetails] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  const [selectedJoinEvent, setSelectedJoinEvent] = useState(null);
  const [action, setAction] = useState(0); //0 - join/request, 1 - leave, 2 - unrequest
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setSelectedJoinEvent(null);
    setShowPopup(false);
  };

  useEffect(() => {
    setShowLoading(true);
    const userName = getCookieValue('user_id');
    if (userName) {
      axios.get(`https://sportssync-backend.onrender.com/getAllEvents`)
        .then((response) => {
          setShowLoading(false);
          setUserDetails(response.data.data);
          // Filter events based on selected sport and date
          const filteredEvents = response.data.data.filter((item) => {
            const registeredEvent = (item.attendees.includes(userName) || item.requestedAttendees.includes(userName));
            const sportMatches = selectedSport === '' || item.sport === selectedSport;
            const dateMatches = (selectedDate===null) || getFormattedDate(new Date(item.date)) === selectedDate?.split('T')[0];
            return !registeredEvent && sportMatches && dateMatches;
          });
          setFilteredEvents(filteredEvents);
        })
        .catch((error) => {
          setShowLoading(false);
          console.log(error);
        });
    }
  }, [selectedSport, selectedDate]);

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  /*const getEventDetails = () => {
    const filteredData = userDetails.filter(item => item.eventId === selectedJoinEvent);
    setJoinedEvent(filteredData);
  }*/

  useEffect(() => {
    const userName = getCookieValue('user_id');
    logEvent(analytics, 'user_landed_join_event', {
      user_email: { userName }
    });
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'join_event', 
      firebase_screen_class: 'join_event'
    });
    if (selectedJoinEvent != null) {
      console.log(selectedJoinEvent);
      setShowPopup(true);
    }
  }, [selectedJoinEvent]);

  const handleAction = (eventId) => {
    //if (action == 0) {
      handleJoinEvent(eventId);
    //} else {
      //handleLeaveEvent(eventId);
    //}
  }

  const handleJoinEvent = (eventId) => {
    const userName = getCookieValue('user_id');
    logEvent(analytics, 'user_joined_event', {
      user_email: { userName }
    });
    if (selectedJoinEvent?.eventId?.length > 0) {
      //joinedEvent[0]?.requestedAttendees.push(getCookieValue('user_id'));
      setShowLoading(true);
      let addData = {};
      if (selectedJoinEvent.isPrivate) {
        addData = {
          requestedAttendees: {
            op: 'add',
            list: [getCookieValue('user_id')]
          }
        }
      } else {
        addData = {
          attendees: {
            op: 'add',
            list: [getCookieValue('user_id')]
          }
        }
      }
      axios({
        method:'post',
        url: `https://sportssync-backend.onrender.com/event?eventId=${selectedJoinEvent.eventId}`, 
        headers: {},
        data: addData
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


  const handleLeaveEvent = (eventId) => {
    const userName = getCookieValue('user_id');
    logEvent(analytics, 'user_joined_event', {
      user_email: { userName }
    });
    if (selectedJoinEvent?.eventId?.length > 0) {
      //joinedEvent[0]?.requestedAttendees.push(getCookieValue('user_id'));
      setShowLoading(true);
      let addData = {};
      if (action == 2) {
        addData = {
          requestedAttendees: {
            op: 'remove',
            list: [getCookieValue('user_id')]
          }
        }
      } else {
        addData = {
          attendees: {
            op: 'remove',
            list: [getCookieValue('user_id')]
          }
        }
      }
      axios({
        method:'post',
        url: `https://sportssync-backend.onrender.com/event?eventId=${selectedJoinEvent.eventId}`, 
        headers: {},
        data: addData
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
              setEventDate={handleDateChange}
            />
          </Grid>
        </Grid>
      </Box>

      {showLoading && <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>}

      {!showLoading &&
        <>
          {filteredEvents.length === 0 ? (
            <Typography variant="h5" align="center">No Events Organized On This Day</Typography>
          ) : (
            <Grid container spacing={2}>
              {filteredEvents.map((item, index) => {
                        if (ABmode && item.isPrivate == false) return (<React.Fragment key={index}></React.Fragment>);
                return (<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ItemCardJoin cardItem={item} selectedEvent={setSelectedJoinEvent} setAction={setAction}/>
                </Grid>);
              })}
            </Grid>
          )}
          <br />
          <br />
        </>
      }

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={showPopup}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {selectedJoinEvent?.eventName}
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
              Sport: {selectedJoinEvent?.sport}
            </Typography>
            <Typography gutterBottom>
              Venue: {selectedJoinEvent?.venue}
            </Typography>
            <Typography gutterBottom>
              Slots Remaining: {selectedJoinEvent?.slotsRemaining}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {handleJoinEvent(selectedJoinEvent?.eventId)}}>
              {(selectedJoinEvent?.isPrivate) ? "Request to Join" : "Join"}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          {(action == 0) ? 
            ((selectedJoinEvent?.isPrivate) ? "Successfully sent Request to Join the game!"
              : "Successfully joined the game!")
            : "Succesfully left game!"}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FilteredCardList;
