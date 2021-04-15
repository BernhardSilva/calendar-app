import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

import { AppRouter } from './router/AppRouter';

export const CalendarApp = () => {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};
