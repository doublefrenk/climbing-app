import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authFetch } from '../utils/authFetch.js';

export const syncSession = createAsyncThunk(
  'session/sync',
  async ({ user, getToken }, { rejectWithValue }) => {
    try {
      const { id, primaryEmailAddress, firstName, lastName, imageUrl } = user;
      const email = primaryEmailAddress.emailAddress;
      const fullName = `${firstName} ${lastName}`;

      const res = await authFetch('/api/users/sync', {
        method: 'POST',
        body: JSON.stringify({ clerkId: id, email, name: fullName, photo: imageUrl }),
      }, getToken);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Sync failed' }));
        return rejectWithValue(err);
      }

      const data = await res.json();
      return data.user;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    userData: null,
    getToken: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setGetToken(state, action) {
      state.getToken = action.payload;
    },
    clearSession(state) {
      state.userData = null;
      state.getToken = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(syncSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(syncSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setGetToken, clearSession } = sessionSlice.actions;

// Selectors
export const selectUserData = (state) => state.session.userData;
export const selectGetToken = (state) => state.session.getToken;
export const selectSessionStatus = (state) => state.session.status;
export const selectSessionError = (state) => state.session.error;

export default sessionSlice.reducer;
