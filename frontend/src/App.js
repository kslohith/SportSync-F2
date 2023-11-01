import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import CustomBottomNavigation from './components/home/BottomNavigation';

function App() {
  return (
    <Box className="App" sx={{ display: 'flex' , backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { xs: '100%' } }}
      >
        {/* <Toolbar sx={{ minHeight: '64px' }} /> */}
        <Outlet />
        {/* <Toolbar sx={{ minHeight: '64px' }} /> */}
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
}

export default App;
