import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal'
import { Grid, Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
//import Switch from '@mui/material/Switch';
import Datepicker from '../createEvent/Datepicker';
import SportsDropdown from '../createEvent/SportsDropdown';
import axios from "axios";

export function ManageEventModal(props) {
    const [eventName, setEventName] = useState(props.cardItem.eventName);
    const [capacity, setCapacity] = useState(props.cardItem.capacity);
    const [location, setLocation] = useState(props.cardItem.venue);
    //const [request, setRequest] = useState(props.cardItem.);
    const [date, setDate] = useState(new Date(props.cardItem.date));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [skill, setSkill] = useState(props.cardItem.evenSkill);
    const [notes, setNotes] = useState('prop');
    const [sport, setSport] = useState(props.cardItem.sport);
    const [disableSave, setDisableSave] = useState(false);
    //const [privateEvent, setPrivateEvent] = React.useState(false);
    console.log(props.cardItem.venue);
    const updateEvent = (e)=> { 
      if (capacity < props.cardItem.attendees.length) {
        console.log("invalid");
      } else {
        props.setCardItem((item) => {
          item.eventName = eventName;
          item.capacity = capacity; 
          item.slotsRemaining = capacity - item.attendees.length; 
          item.venue = location;
          item.sport = sport; 
          item.date = date; 
          return item;
        });
        axios({
          method: 'post',
          url: `https://sportssync-backend.onrender.com/event?eventId=${props.cardItem.eventId}`,
          headers: {},
          data: {
            eventName: eventName,
            capacity: capacity,
            slotsRemaining: capacity - props.cardItem.attendees.length, 
            location: location,
            sport: sport
          }
        }).catch((e)=>console.log(e)).then(()=>props.setOpenModal(false));
      }
      
    }

    return(
    <Modal open={props.openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={style}>
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
          <SportsDropdown sport={sport} setSportName={setSport} />
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
          <Datepicker date={date} setEventDate={setDate}/>
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

        {/* <Grid item xs={12}>
        <FormGroup>
            <FormControlLabel  control={<Switch
            checked={privateEvent}
            onChange={handlePrivateEventChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Private Event" />
        </FormGroup>
        </Grid> */}

        <Grid item xs={12}>
          <Button variant="contained" onClick={updateEvent}>Save</Button>
          <Button variant="contained" onClick={(e)=>props.setOpenModal(false)}>Close</Button>
        </Grid>
    </Grid>
    </Box>
    </Modal>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height:'80%',
    overflow:'scroll',
    bgcolor: 'white',
    border: '2px solid #000',
    padding: '15px',
    borderRadius: '2%'
};