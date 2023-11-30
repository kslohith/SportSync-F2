import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Grid, Card, CardContent, Typography, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import AttendeeBox from "./AttendeeBox";
import RequesteeBox from "./RequesteeBox";
import DeleteIcon from '@mui/icons-material/Delete';
import emailjs from 'emailjs-com';

function sendAcceptNotif(email, eventName) {
  const emailParams = {
    to_email: email,
    e_message: `Your request to join event ${eventName} has been approved!`,
  };

  emailjs
  .send(
    'service_kuya3oc',
    'template_eqg87j9',
    emailParams,
    'KfXB4eRwr17xWB1Pd'
  )
    .then((response) => {
      console.log('Email sent successfully:', response);
      console.log(email);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send verification code via email.');
    });
}

function sendDeleteNotif(attendees, requestedAttendees, eventName) {
  var rep = "";
  for (let i = 0; i < attendees.length; i++) {
    rep += attendees[i];
    if (i != attendees.length-1) rep+= ", "
  }
  if (requestedAttendees.length > 0) rep += ", "
  for (let i = 0; i < requestedAttendees.length; i++) {
    rep += requestedAttendees[i];
    if (i != requestedAttendees.length-1) rep+= ", "
  }
  const emailParams = {
    to_email: rep,
    e_message: `Event ${eventName} has unfortunately been cancelled`,
  };

  emailjs
  .send(
    'service_kuya3oc',
    'template_eqg87j9',
    emailParams,
    'KfXB4eRwr17xWB1Pd'
  )
    .then((response) => {
      console.log('Email sent successfully:', response);
      console.log(rep);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send verification code via email.');
    });
}

const ManageEvent = () => {
  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0); // 0 for Requests, 1 for Attendees
  const { eventId } = useParams();

  const fetchData = () => {
    axios.get(`https://sportssync-backend.onrender.com/event?eventId=${eventId}`)
      .then((response) => {
        setAttendeeDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const handleRefresh = () => {
    fetchData();
  };

  const removeAttendee = (attendeeName) => {
    // Your remove attendee logic
    // ...
    axios({
      method: 'post',
      url: `https://sportssync-backend.onrender.com/event?eventId=${eventId}`,
      headers: {},
      data: {
        attendees: {
          op: 'remove',
          list: [attendeeName],
        },
      },
    })
      .then((response) => {
        // Handle success if needed
        console.log('Attendee removed successfully:', attendeeName);
        handleRefresh();
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error removing attendee:', attendeeName, error);
      });

    //handleRefresh();
  };

  const denyAttendee = (attendeeName) => {
    // Your deny attendee logic
    // ...
    axios({
      method: 'post',
      url: `https://sportssync-backend.onrender.com/event?eventId=${eventId}`,
      headers: {},
      data: {
        requestedAttendees: {
          op: 'remove',
          list: [attendeeName],
        },
      },
    })
      .then((response) => {
        // Handle success if needed
        console.log('Attendee denied successfully:', attendeeName);
        handleRefresh();
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error denying attendee:', attendeeName, error);
      });
    //handleRefresh();
  };

  const acceptAttendee = (attendeeName) => {
    // Your accept attendee logic
    // ...
    axios({
      method: 'post',
      url: `https://sportssync-backend.onrender.com/event?eventId=${eventId}`,
      headers: {},
      data: {
        attendees: {
          op: 'add',
          list: [attendeeName],
        },
        requestedAttendees: {
          op: 'remove',
          list: [attendeeName],
        },
      },
    }).then((response) => {
        // Handle success if needed
        console.log('Attendee added successfully:', attendeeName);
        sendAcceptNotif(attendeeName, attendeeDetails.eventName);
        handleRefresh();
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error adding attendee:', attendeeName, error);
      });
    //handleRefresh();
  };

  const navigate = useNavigate();

  const deleteEvent = () => {
    axios({
      method: 'post',
      url: `https://sportssync-backend.onrender.com/deleteEvent`,
      headers: {},
      data: {
        id: eventId,
      }
    }).then((res)=> {
      console.log(res);
      sendDeleteNotif(attendeeDetails.attendees, attendeeDetails.requestedAttendees, attendeeDetails.eventName);
      navigate(-1);
    }).catch((err)=> {
      console.log('There was issue in deleting this event');
    });
  }
  return (
    <Container>
      {showLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </div>
      )}

      {!showLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs variant="fullWidth" centered value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
              <Tab sx={{borderLeft:1}} label="Requests" />
              <Tab sx={{borderRight:1}} label="Attendees" />
              <Tab label={<DeleteIcon/>}/>
            </Tabs>
          </Grid>

          {currentTab === 0 && attendeeDetails.requestedAttendees.length > 0 && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Requests</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {currentTab === 0 && attendeeDetails.requestedAttendees.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <RequesteeBox attendeeName={item} onDenyClick={() => denyAttendee(item)} onAcceptClick={() => acceptAttendee(item)} />
            </Grid>
          ))}

          {currentTab === 0 && attendeeDetails.requestedAttendees.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" align="center" style={{ fontStyle: 'italic' }}>
                No pending requests
              </Typography>
            </Grid>
          )}

          {currentTab === 1 && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Attendees</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {currentTab === 1 && attendeeDetails.attendees.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <AttendeeBox attendeeName={item} onRemoveClick={() => removeAttendee(item)} />
            </Grid>
          ))}

          {currentTab === 2 && 
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button variant="contained" onClick={deleteEvent}>Delete event</Button>
            </Grid>
          }
        </Grid>
      )}

      {currentTab !== 2 && <Grid container justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleRefresh}>
          Refresh
        </Button>
      </Grid>}
    </Container>
  );
};

export default ManageEvent;