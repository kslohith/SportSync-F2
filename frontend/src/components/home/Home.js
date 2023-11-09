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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Home = () => {
    const [userDetails, setUserDetails] = React.useState([]);
    const [showLoading, setShowLoading] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [upcomingGame, setUpcomingGame] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
            setShowLoading(true);
            const userName = getCookieValue('user_id')
            logEvent(analytics, 'user_landed_home_page', {
                user_email: {userName}
            });
            logEvent(analytics, 'screen_view', {
                firebase_screen: 'Home_page', 
                firebase_screen_class: ''
              });
            if (userName) {
                axios.get(`https://sportssync-backend.onrender.com/getEventByUser?name=${userName}`)
                .then((response) => {
                    setShowLoading(false);
                    setUserDetails(response.data.data); 
                })
                .catch((error) => {
                    setShowLoading(false);
                    console.log(error);
                });
            }
            setShowLoading(true);
            if (userName) {
                axios.get(`https://sportssync-backend.onrender.com/getUpcomingGames?email=${userName}`)
                .then((response) => {
                    setShowLoading(false);
                    setUpcomingGame(response.data.data); 
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
            {!showLoading && <Grid container spacing={2}>
                <Grid item xs={4}>
                    <CardLayout operation={"play"} callback={decideOperation} style={{marginBottom: '8px'}}/>
                </Grid>
                <Grid item xs={4}>
                    <CardLayout operation={"organize"} callback={decideOperation} style={{margin: '8px'}}/>
                </Grid>
                <Grid item xs={4}>
                    <CardLayout operation={"mentor"} callback={decideOperation} style={{margin: '8px'}}/>
                </Grid>
            </Grid>
            }
            {!showLoading && <Box sx={{ width: '100%', padding: '0px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '8px' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="My Events" {...a11yProps(0)} />
                    <Tab label="Upcoming Games" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={2} style={{ padding: '0px'}}>
                        {userDetails.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <ItemCard cardItem={item}/>
                            </Grid>
                        ))}
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        {upcomingGame.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <ItemCard cardItem={item}/>
                            </Grid>
                        ))}
                    </Grid>
                </CustomTabPanel>
                </Box>
            }
            <br></br>
            <br></br>
        </>
    );
}

export default Home;