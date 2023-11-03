import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/home/Home';
import Login from './components/login/Login';
import ProtectedRoutes from './components/login/ProtectedRoute';
import CreateScreen from './components/createEvent/CreateScreen';
import JoinEvent from './components/joinEvent/JoinEvent';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/dashboard',
            element: <Home />,
          },
          {
            path: '/createevent',
            element: <CreateScreen />,
          },
          {
            path: '/join',
            element: <JoinEvent />
          }
        ],
      },
    ],
  }
]);

export default router;
