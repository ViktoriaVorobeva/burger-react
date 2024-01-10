import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

type TProtected = {
  onlyUnAuth?: boolean,
  children: React.ReactElement
}

export const ProtectedRouteElement = ({ children, onlyUnAuth = false }: React.PropsWithChildren<TProtected>) => {
    const isAuthChecked = useSelector((state) => state.register.isLoading);
    const {user} = useSelector((state) => state.register);
    const location = useLocation();
  
    if (isAuthChecked) {
      return <div>Loading...</div>;
    }
  
    if (onlyUnAuth && user) {
      const { from } = location.state || { from: { pathname: "/" } };
      return <Navigate to={from} />;
    }
  
    if (!onlyUnAuth && !user) {
      return (
        <Navigate
          to="/login"
          state={{ from: location }}
        />
      );
    }
  
    return children;
  };