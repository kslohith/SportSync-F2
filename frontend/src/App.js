import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import CustomBottomNavigation from './components/home/BottomNavigation';
import { useState } from 'react';
import axios from 'axios';
function App() {
  const [ABmode, setABmode] = useState(false);

  React.useEffect(() => {
    axios.get(`https://sportssync-backend.onrender.com/getABstatus`)
        .then((response) => {
            console.log(response.data.data[0].enableABtest)
            setABmode(response.data.data[0].enableABtest)
          })
        .catch((error) => {
          console.log(error);
        });
      },[]);
  return (
    <Box className="App" sx={{ display: 'flex' , backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { xs: '100%' } }}
      >
        {/* <Toolbar sx={{ minHeight: '64px' }} /> */}
        <Outlet context={[ABmode, setABmode]}/>
        {/* <Toolbar sx={{ minHeight: '64px' }} /> */}
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
}

export default App;
