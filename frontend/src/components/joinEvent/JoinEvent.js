import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Container, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../createEvent/Datepicker';
import axios from "axios";
import ItemCard from '../home/ItemCard';

const sportsData = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball'];

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

function FilteredCardList() {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [userDetails, setUserDetails] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  useEffect(() => {
    setShowLoading(true);
    const userName = getCookieValue('user_id')
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

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <Container>
      <Box my={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Datepicker
              selectedDateRange={selectedDateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Example Card */}
      {!showLoading && 
                <>
                <Grid container spacing={2}>
                    {userDetails.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ItemCard title={item.eventName} description={item.venue} date={new Date(item.date).toISOString().split('T')[0]} time={new Date(item.date).toISOString().split('T')[1].split('.')[0]} />
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                </>
            }

      {/* Repeat the Card component for each item in your filtered data */}
    </Container>
  );
}

export default FilteredCardList;
