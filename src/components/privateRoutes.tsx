import { Route, Navigate, Routes, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }: { component: React.ElementType, [key: string]: any }) => {
  // Check if user is authenticated
  const dontShowAfterLogin = ['/signin', '/signup'];
  const isAuthenticated = localStorage.getItem('token'); // Implement your authentication logic
  const location = useLocation();

  return !!isAuthenticated && !dontShowAfterLogin.includes(location.pathname) ? (
        <Component {...rest}/>
      ) : !!isAuthenticated && dontShowAfterLogin.includes(location.pathname)
            ? (<Navigate to="/" replace={true}/>)
            : (<Navigate to="/signin" replace={true} />)
};
