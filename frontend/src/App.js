import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import CustomBottomNavigation from './components/home/BottomNavigation';
import { useState } from 'react';
function App() {
  const [ABmode, setABmode] = useState(false);
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
