import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authFetch } from '../utils/authFetch.js';

export const refreshStats = createAsyncThunk(
  'stats/refresh',
  async ({ userId, getToken }, { rejectWithValue }) => {
    try {
      const [resGrades, resDate] = await Promise.all([
        authFetch(`/api/routes/stats/grades/${userId}`, {}, getToken),
        authFetch(`/api/routes/stats/date/${userId}`, {}, getToken),
      ]);

      if (!resGrades.ok || !resDate.ok) {
        const err = await (resGrades.ok ? resDate : resGrades)
          .json()
          .catch(() => ({ message: 'Failed to fetch stats' }));
        return rejectWithValue(err);
      }

      const statsGrades = await resGrades.json();
      const statsDate = await resDate.json();
      return { statsGrades, statsDate };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    statsGrades: null,
    statsDate: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshStats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(refreshStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.statsGrades = action.payload.statsGrades;
        state.statsDate = action.payload.statsDate;
      })
      .addCase(refreshStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectStatsGrades = (state) => state.stats.statsGrades;
export const selectStatsDate = (state) => state.stats.statsDate;
export const selectStatsStatus = (state) => state.stats.status;
export const selectStatsError = (state) => state.stats.error;

export default statsSlice.reducer;
