import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice.js';
import routesReducer from './routesSlice.js';
import statsReducer from './statsSlice.js';
import uiReducer from './uiSlice.js';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    routes: routesReducer,
    stats: statsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // getToken is a function, not serializable — exclude from checks
      serializableCheck: {
        ignoredActions: ['session/setGetToken'],
        ignoredPaths: ['session.getToken'],
      },
    }),
});

export default store;
