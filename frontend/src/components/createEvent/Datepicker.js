import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Datepicker = () => {
//   const [value, setValue] = React.useState<Dayjs | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Game Start Time" />
    </LocalizationProvider>
  );
}

export default Datepicker;