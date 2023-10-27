import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/home/home';
import Login from './components/login/login';
import ProtectedRoutes from './components/login/protectedRoute';
import CreateScreen from './components/createEvent/CreateScreen';


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
        ],
      },
    ],
  }
]);

export default router;
