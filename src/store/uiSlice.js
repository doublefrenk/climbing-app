import { createSlice } from '@reduxjs/toolkit';
import { addRoute, deleteRoute, editRoute, fetchRoutes } from './routesSlice.js';
import { refreshStats, } from './statsSlice.js';
import { syncSession } from './sessionSlice.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    const pendingActions = [
      syncSession.pending,
      fetchRoutes.pending,
      addRoute.pending,
      deleteRoute.pending,
      editRoute.pending,
      refreshStats.pending,
    ];
    const fulfilledActions = [
      syncSession.fulfilled,
      fetchRoutes.fulfilled,
      addRoute.fulfilled,
      deleteRoute.fulfilled,
      editRoute.fulfilled,
      refreshStats.fulfilled,
    ];
    const rejectedActions = [
      syncSession.rejected,
      fetchRoutes.rejected,
      addRoute.rejected,
      deleteRoute.rejected,
      editRoute.rejected,
      refreshStats.rejected,
    ];

    pendingActions.forEach((action) => {
      builder.addCase(action, (state) => {
        state.isLoading = true;
        state.error = null;
      });
    });
    fulfilledActions.forEach((action) => {
      builder.addCase(action, (state) => {
        state.isLoading = false;
      });
    });
    rejectedActions.forEach((action) => {
      builder.addCase(action, (state, act) => {
        state.isLoading = false;
        state.error = act.payload;
      });
    });
  },
});

export const { clearError, setError } = uiSlice.actions;

// Selectors
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectUiError = (state) => state.ui.error;

export default uiSlice.reducer;
