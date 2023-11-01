import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Datepicker = ({setEventDate}) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = (dateSelected) => {
    console.log(new Date(dateSelected).toISOString());
    setSelectedDate(new Date(dateSelected).toISOString());
    setEventDate(new Date(dateSelected).toISOString());
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Game Start Time" onChange={(newValue) => {handleDateChange(newValue)}} />
    </LocalizationProvider>
  );
}

export default Datepicker;