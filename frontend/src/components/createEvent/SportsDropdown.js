import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SportsDropdown = (props) => {
    const {setSportName} = props
    const [selectedSport, setSelectedSport] = React.useState("");

    const handleChange = (event) =>{
        setSelectedSport(event.target.value);
        setSportName(event.target.value);
    }

    return(
        <>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Sport</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSport}
                label="Sport"
                onChange={handleChange}
                >
                <MenuItem value={"Badminton"}>Badminton</MenuItem>
                <MenuItem value={"Cricket"}>Cricket</MenuItem>
                <MenuItem value={"Football"}>Football</MenuItem>
                <MenuItem value={"Soccer"}>Soccer</MenuItem>
                <MenuItem value={"Volleyball"}>Volleyball</MenuItem>
                <MenuItem value={"Tennis"}>Tennis</MenuItem>
                <MenuItem value={"Fencing"}>Fencing</MenuItem>
                <MenuItem value={"Squash"}>Squash</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </>
    )
}

export default SportsDropdown;