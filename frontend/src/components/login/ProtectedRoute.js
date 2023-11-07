import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = getCookieValue('user_id');
  if (user) {
    return true;
  } else {
    return false;
  }
};

function getCookieValue(key) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + '=')) {
      return decodeURIComponent(cookie.substring(key.length + 1));
    }
  }
  return null; 
}

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
