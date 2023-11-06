import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardLayout from "../home/Card";
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ItemCard from "../home/ItemCard";
import { logEvent } from "firebase/analytics";
import analytics from "../../config/firebaseConfig";
import AttendeeBox from "./AttendeeBox";
import RequesteeBox from "./RequesteeBox";


const ManageEvent = () => {
    const [attendeeDetails, setAttendeeDetails] = React.useState([]);
    const [showLoading, setShowLoading] = React.useState(false);



    const fetchData = () => {
        const eventId = 'ysoaiETl'
        setShowLoading(true);
        axios.get(`https://sportssync-backend.onrender.com/event?eventId=${eventId}`)
            .then((response) => {
                setShowLoading(false);
                setAttendeeDetails(response.data.data);
                console.log(attendeeDetails);
            })
            .catch((error) => {
                setShowLoading(false);
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


        
    const handleRefresh = () => {
        fetchData();
    }

    const removeAttendee = (attendeeName) => {
        axios({
          method: 'post',
          url: 'https://sportssync-backend.onrender.com/event?eventId=ysoaiETl',
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
        axios({
          method: 'post',
          url: 'https://sportssync-backend.onrender.com/event?eventId=ysoaiETl',
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
        axios({
          method: 'post',
          url: 'https://sportssync-backend.onrender.com/event?eventId=ysoaiETl',
          headers: {},
          data: {
            requestedAttendees: {
              op: 'remove',
              list: [attendeeName],
            },
          },
        })

        axios({
            method: 'post',
            url: 'https://sportssync-backend.onrender.com/event?eventId=ysoaiETl',
            headers: {},
            data: {
              attendees: {
                op: 'add',
                list: [attendeeName],
              },
            },
          })

          .then((response) => {
            // Handle success if needed
            console.log('Attendee added successfully:', attendeeName);
            handleRefresh();
          })
          .catch((error) => {
            // Handle error if needed
            console.error('Error adding attendee:', attendeeName, error);
          });
          
      };

    
    const containerStyle = {
        width: '100%',
        height: '300px',
        overflowY: 'scroll', // Vertical scrolling
        // overflowX: 'scroll', // Uncomment for horizontal scrolling
    };

        
    const navigate = useNavigate();

    return(
        <>
            {showLoading && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
            {!showLoading && attendeeDetails.attendees &&
                <Grid container spacing={2}>
                <Card sx={{ minWidth: 275, margin: '14px auto' }}>
                    <CardContent>
                    <Typography variant="h5"  gutterBottom>
                        Requests
                    </Typography>
                    </CardContent>
                    </Card>
                    <div style={containerStyle}>
                    {attendeeDetails.requestedAttendees.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <RequesteeBox attendeeName = {item} onDenyClick={() => denyAttendee(item)} onAcceptClick ={() => acceptAttendee(item)} />
                            
                        </Grid>
                    ))}
                    </div>

            
                <Card sx={{ minWidth: 275, margin: '14px auto' }}>
                    <CardContent>
                    <Typography variant="h5"  gutterBottom>
                        Attendees
                    </Typography>
                    </CardContent>
                </Card>
                <div style={containerStyle}>
                {attendeeDetails.attendees.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <AttendeeBox attendeeName={item} onRemoveClick={() => removeAttendee(item)}/>
                            
                        </Grid>
                    ))}
                    </div>
                </Grid>
                
            }
            <Grid container item justifyContent="right">
                <button onClick={handleRefresh}>
                    Refresh
                </button>
             </Grid>


            <br></br>
            <br></br>
        </>
    );
}

export default ManageEvent;