import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

const Datepicker = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = (dateSelected) => {
    const localDateString = dayjs(dateSelected).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    props.setEventDate(localDateString);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker 
          label="Game Start Time" 
          value={(props.date != null) ? dayjs(props.date): null}
          onChange={(newValue) => {handleDateChange(newValue)}} 
        />
    </LocalizationProvider>
  );
}

export default Datepicker;