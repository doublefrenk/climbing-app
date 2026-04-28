import { createSlice } from '@reduxjs/toolkit';

// Tracked action type prefixes — no direct imports needed (avoids circular deps)
const TRACKED_PREFIXES = [
  'session/sync',
  'routes/fetchAll',
  'routes/add',
  'routes/delete',
  'routes/edit',
  'stats/refresh',
];

const isPending = (action) =>
  TRACKED_PREFIXES.some((prefix) => action.type === `${prefix}/pending`);

const isFulfilled = (action) =>
  TRACKED_PREFIXES.some((prefix) => action.type === `${prefix}/fulfilled`);

const isRejected = (action) =>
  TRACKED_PREFIXES.some((prefix) => action.type === `${prefix}/rejected`);

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
    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setError } = uiSlice.actions;

// Selectors
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectUiError = (state) => state.ui.error;

export default uiSlice.reducer;
