import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Typography, Container, Grid, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import SportsDropdown from './SportsDropdown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Datepicker from './Datepicker';
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { logEvent } from "firebase/analytics";
import analytics from "../../config/firebaseConfig";
import dayjs from 'dayjs';

const skillLevels = [
  ["Any", "Beginner", "Intermidiate", "Advanced"],
  ["Any", "Learning", "Casual", "Competitive", ]
]

const CreateScreen = () => {
  const [ABmode, setABmode] = useOutletContext();

  const [eventName, setEventName] = useState('');
  const [capacity, setCapacity] = useState('1');
  const [location, setLocation] = useState('');
  const [request, setRequest] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [skill, setSkill] = useState(0);
  const [notes, setNotes] = useState('');
  const [disableSave, setDisableSave] = useState(false);
  const [sport, setSport] = useState('');
  const [privateEvent, setPrivateEvent] = React.useState(false);
  const userId = getCookieValue('user_id');
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`https://sportssync-backend.onrender.com/getABstatus`)
        .then((response) => {
            console.log(response.data.data[0].enableABtest)
            setABmode(response.data.data[0].enableABtest)
          })
        .catch((error) => {
          console.log(error);
        });
      },[]);

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

  useEffect(() => {
    const userName = getCookieValue('user_id')
    logEvent(analytics, 'user_landed_create_event', {
        user_email: {userName}
    });
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'create_event', 
      firebase_screen_class: 'create_event'
    });
  },[]);

  const handlePrivateEventChange = (event) => {
    setPrivateEvent(event.target.checked)
  }

  const setSportName = (name) => {
    setSport(name);
  }

  const createEvent = () => {
    var cap = /^(?=.*\d)[\d ]+$/.test(capacity) ? parseInt(capacity) : -1;
    if (!eventName.replace(/\s/g, '').length || !location.replace(/\s/g, '').length || cap <= 0 || sport === '') {
      alert('Invalid input');
      return;
    }
  
    const adjustedDate = new Date(date);
    const options = { timeZone: 'America/New_York', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateString = new Intl.DateTimeFormat('en-US', options).format(adjustedDate);
  
    axios({
      method: 'post',
      url: 'https://sportssync-backend.onrender.com/createEvent',
      headers: {},
      data: {
        eventName: eventName,
        organizer: userId,
        venue: location,
        date: dateString,
        slotsRemaining: cap - 1,
        isPrivate: privateEvent,
        capacity: cap,
        attendees: [userId],
        dateOfCreation: new Date(),
        eventSkill: skillLevels[0][skill],
        requestedAttendees: [],
        sport: sport,
      },
    })
      .then((response) => {
        const userName = getCookieValue('user_id')
        logEvent(analytics, 'user_created_event', {
          user_email: {userName}
        });
        console.log(response);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setDisableSave(false);
      });
  };
  

  const setEventDate = (selectedDate) => {
    // Log the selected date
    console.log(selectedDate);
  
    // Format the date manually with options
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const dateString = dateFormatter.format(new Date(selectedDate));
  
    // Log the formatted date
    console.log(dateString);
  
    // Set the state with the formatted date
    setDate(dateString);
  };
  
  return (
    <React.Fragment>
    <Card variant="outlined">
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
            fullWidth
            label="Event Name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <SportsDropdown sport={sport} setSportName={setSportName} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity.toString()}
            fullWidth
            type="number"
            label="Capacity"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Datepicker date={date} setEventDate={setEventDate}/> 
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            fullWidth
            label="Location"
            variant="outlined"
          />
        </Grid>

        {/* <Grid item xs={12}>
          <Typography variant="h6">Skill:</Typography>
          <SearchDropdown skill={skill} setSkill={setSkill} />
        </Grid> */}
        
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">Skill</InputLabel>
          <Select
            
            value={skill}
            onChange={(e)=>setSkill(e.target.value)}
          >
            {skillLevels[(ABmode)?1:0].map((item, index)=>(
              <MenuItem key={index} value={index}>{item}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            variant="outlined"
            label="Notes"
            maxRows={4}
          />
        </Grid>

        {!ABmode && <Grid item xs={12}>
        <FormGroup>
            <FormControlLabel  control={<Switch
            checked={privateEvent}
            onChange={handlePrivateEventChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Request to Join" />
        </FormGroup>
        </Grid>}

        <Grid item xs={12}>
          <Button variant="contained" onClick={createEvent}>Create Event</Button>
        </Grid>
      </Grid>
    </CardContent>
    </Card>
    {/* <Button variant="contained" sx={{marginTop:'30px', padding:'3px', bgcolor:'purple'}} onClick={()=>setABmode(!ABmode)}>For Dev use only!</Button> */}
    </React.Fragment>
  );
}

export default CreateScreen;