import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = document.cookie;
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
