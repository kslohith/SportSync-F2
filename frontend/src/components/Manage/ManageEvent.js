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


const ManageEvent = () => {
    const [attendeeDetails, setAttendeeDetails] = React.useState([]);
    const [showLoading, setShowLoading] = React.useState(false);



    useEffect(() => {
            setShowLoading(true);
            const userName = getCookieValue('user_id')
            /*
            logEvent(analytics, 'user_landed_home_page', {
                user_email: 'ysoaiETl'
            }); */
            //if (userName) {
            if (true) {
                axios.get(`https://sportssync-backend.onrender.com/event?eventId=ysoaiETl`)
                .then((response) => {
                    setShowLoading(false);
                    setAttendeeDetails(response.data.data); // Access the "data" field
                    console.log(attendeeDetails);
                })
                .catch((error) => {
                    setShowLoading(false);
                    console.log(error);
                });
            }
        },[]);


        const handleClick = () => {
            console.log(attendeeDetails.attendees);
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
                        Attendees
                    </Typography>
                    </CardContent>
                </Card>    
                {attendeeDetails.attendees.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <AttendeeBox attendeeName = {item} />
                            
                        </Grid>
                    ))}
                </Grid>
                
            }
            <button onClick={handleClick}>
        Click me
      </button>


            <br></br>
            <br></br>
        </>
    );
}

export default ManageEvent;