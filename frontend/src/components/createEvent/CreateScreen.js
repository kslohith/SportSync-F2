import React, { useState } from 'react';
import { Button, Checkbox, Typography, Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import SportsDropdown from './SportsDropdown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Datepicker from './Datepicker';
import { useNavigate } from 'react-router-dom';


const CreateScreen = () => {
  const [eventName, setEventName] = useState('');
  const [capacity, setCapacity] = useState('1');
  const [location, setLocation] = useState('');
  const [request, setRequest] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [skill, setSkill] = useState('Any');
  const [notes, setNotes] = useState('');
  const [disableSave, setDisableSave] = useState(false);
  const [sport, setSport] = useState('');
  const [privateEvent, setPrivateEvent] = React.useState(false);
  const userId = 'Himanshu';
  const navigate = useNavigate();

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
    setDisableSave(true);
    axios({
      method: 'post',
      url: 'https://sportssync-backend.onrender.com/createEvent',
      headers: {},
      data: {
        eventName: eventName,
        organizer: userId,
        venue: location,
        date: date,
        slotsRemaining: cap - 1,
        isPrivate: request,
        capacity: cap,
        attendees: [userId],
        dateOfCreation: new Date(),
        eventSkill: skill,
        requestedAttendees: [],
        sport: sport,
      },
    })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setDisableSave(false);
      });
  };

  return (
    <Container>
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
          <SportsDropdown setSportName={setSportName} />
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
          <Datepicker />
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

        <Grid item xs={12}>
        <FormGroup>
            <FormControlLabel  control={<Switch
            checked={privateEvent}
            onChange={handlePrivateEventChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Private Event" />
        </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={createEvent}>Create Event</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateScreen;
