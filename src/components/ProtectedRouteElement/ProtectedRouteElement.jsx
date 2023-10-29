import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';

export const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
    const location = useLocation();
    const isAuthChecked = true;

    const {user} = useSelector(state => state.register);

    if (!isAuthChecked) {
        return <div>Loading...</div>
    }

    if (onlyUnAuth && user) {
        const {from} = location.state || { from: {pathname: '/'}}
     return <Navigate to={from}/>   
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to={'/login'} state={{ from: location }}/> 
    }

    return children;
}

ProtectedRouteElement.propTypes = {
    onlyUnAuth: propTypes.bool.isRequired,
    children: propTypes.element.isRequired, 
  };