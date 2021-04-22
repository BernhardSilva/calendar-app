import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/actions/auth';
import Loading from '../../src/assets/loading.gif';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div>
        <img src={Loading} alt="Loading" className="loading-img" />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/login"
          component={LoginScreen}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          exact
          path="/"
          component={CalendarScreen}
          isAuthenticated={!!uid}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
