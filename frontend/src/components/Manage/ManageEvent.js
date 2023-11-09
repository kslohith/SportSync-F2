import { Button, CircularProgress, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import AttendeeBox from "./AttendeeBox";
import RequesteeBox from "./RequesteeBox";

const ManageEvent = () => {
  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
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
      
  };

  const denyAttendee = (attendeeName) => {
    // Your deny attendee logic
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
  };

  const acceptAttendee = (attendeeName) => {
    // Your accept attendee logic
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
        handleRefresh();
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error adding attendee:', attendeeName, error);
      });
      
  };

  const navigate = useNavigate();

  return (
    <Container>
      {showLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </div>
      )}

      {!showLoading && (
        <Grid container spacing={3}>
          {attendeeDetails.requestedAttendees.length > 0 && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Requests</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {attendeeDetails.requestedAttendees.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <RequesteeBox attendeeName={item} onDenyClick={() => denyAttendee(item)} onAcceptClick={() => acceptAttendee(item)} />
            </Grid>
          ))}

          {attendeeDetails.requestedAttendees.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" align="center" style={{ fontStyle: 'italic' }}>
                No pending requests
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Attendees</Typography>
              </CardContent>
            </Card>
          </Grid>

          {attendeeDetails.attendees.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <AttendeeBox attendeeName={item} onRemoveClick={() => removeAttendee(item)} />
            </Grid>
          ))}
        </Grid>
      )}

      <Grid container justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleRefresh}>
          Refresh
        </Button>
      </Grid>
    </Container>
  );
};

export default ManageEvent;
