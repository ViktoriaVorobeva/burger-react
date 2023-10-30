import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';

export const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
    const isAuthChecked = useSelector((state) => state.register.isLoading);
    const {user} = useSelector(state => state.register);
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

ProtectedRouteElement.propTypes = {
    onlyUnAuth: propTypes.bool,
    children: propTypes.element.isRequired, 
  };