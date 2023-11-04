import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardLayout from "./Card";
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ItemCard from "./ItemCard";
import { logEvent } from "firebase/analytics";
import analytics from "../../config/firebaseConfig";

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

const Home = () => {
    const [userDetails, setUserDetails] = React.useState([]);
    const [showLoading, setShowLoading] = React.useState(false);

    useEffect(() => {
            setShowLoading(true);
            const userName = getCookieValue('user_id')
            logEvent(analytics, 'user_landed_home_page', {
                user_email: {userName}
            });
            if (userName) {
                axios.get(`https://sportssync-backend.onrender.com/getEventByUser?name=${userName}`)
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
       
  
    const navigate = useNavigate();
    const decideOperation = (operation) => {
        switch(operation) {
            case 'organize': navigate("/createevent");
                             break;
            case 'play': navigate("/join")
                         break;
        }
    }

    return(
        <>
            {showLoading && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
            {!showLoading && <div style={{width: "100%", margin: '8px'}}>
                <CardLayout operation={"play"} callback={decideOperation} style={{marginBottom: '8px'}}/>
                <br />
                <CardLayout operation={"organize"} callback={decideOperation} style={{margin: '8px'}}/>
                <br></br>
                <CardLayout operation={"mentor"} callback={decideOperation} style={{margin: '8px'}}/>
            </div>
            }
            {!showLoading && 
                <Grid container spacing={2}>
                <Card sx={{ minWidth: 275, marginTop: '14px', marginLeft: '16px' }}>
                    <CardContent>
                    <Typography variant="h7"  gutterBottom>
                        Upcoming Events
                    </Typography>
                    </CardContent>
                </Card>
                    {userDetails.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ItemCard title={item.eventName} venue={item.venue} date={new Date(item.date).toISOString().split('T')[0]} time={new Date(item.date).toISOString().split('T')[1].split('.')[0]} />
                        </Grid>
                    ))}
                </Grid>
            }
            <br></br>
            <br></br>
        </>
    );
}

export default Home;