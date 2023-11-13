import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

const Datepicker = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = (dateSelected) => {
    console.log(dateSelected.toISOString());
    //setSelectedDate(value.toISOString());
    props.setEventDate(dateSelected.toISOString());
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker 
          label="Game Start Time" 
          value={dayjs(props.date)}
          onChange={(newValue) => {handleDateChange(newValue)}} 
        />
    </LocalizationProvider>
  );
}

export default Datepicker;