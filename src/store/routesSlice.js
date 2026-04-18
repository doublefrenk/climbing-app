import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { authFetch } from '../utils/authFetch.js';
import { refreshStats } from './statsSlice.js';

export const fetchRoutes = createAsyncThunk(
  'routes/fetchAll',
  async ({ userId, getToken }, { rejectWithValue }) => {
    try {
      const res = await authFetch('/api/routes', {}, getToken);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed to fetch routes' }));
        return rejectWithValue(err);
      }
      const data = await res.json();
      const all = data.routes;
      return {
        boulder: all.boulder.filter((r) => r.users.includes(userId)),
        sport: all.sport.filter((r) => r.users.includes(userId)),
        gymRoutes: all.gymRoutes.filter((r) => r.users.includes(userId)),
      };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const addRoute = createAsyncThunk(
  'routes/add',
  async ({ newRoute, selectedCategory, userId, getToken }, { rejectWithValue, dispatch }) => {
    try {
      // Check if route already exists and add user to it
      const resAll = await authFetch('/api/routes', {}, getToken);
      if (!resAll.ok) {
        const err = await resAll.json().catch(() => ({ message: 'Failed to fetch routes' }));
        return rejectWithValue(err);
      }
      const allData = await resAll.json();
      const allRoutes = allData.routes;
      const existing = allRoutes[selectedCategory].filter(
        (r) => r.title === newRoute.title && r.sector === newRoute.sector && r.grade === newRoute.grade
      );

      if (existing.length > 0) {
        const toUpdate = { ...existing[0], users: [...existing[0].users, userId] };
        await authFetch(`/api/routes/${existing[0].id}`, {
          method: 'PUT',
          body: JSON.stringify(toUpdate),
        }, getToken);
        dispatch(fetchRoutes({ userId, getToken }));
        await dispatch(refreshStats({ userId, getToken }));
        return null; // no new route to add locally, re-fetch handled it
      }

      // Create new route
      const res = await authFetch('/api/routes', {
        method: 'POST',
        body: JSON.stringify({ ...newRoute, type: selectedCategory, users: [userId] }),
      }, getToken);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed to add route' }));
        return rejectWithValue(err);
      }
      await dispatch(refreshStats({ userId, getToken }));
      // Re-fetch to get server-assigned id
      dispatch(fetchRoutes({ userId, getToken }));
      return null;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const deleteRoute = createAsyncThunk(
  'routes/delete',
  async ({ routeId, userId, getToken }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authFetch(`/api/routes/${routeId}`, { method: 'DELETE' }, getToken);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed to delete route' }));
        return rejectWithValue(err);
      }
      await dispatch(refreshStats({ userId, getToken }));
      return routeId;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const editRoute = createAsyncThunk(
  'routes/edit',
  async ({ routeId, updatedRoute, userId, getToken }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authFetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRoute),
      }, getToken);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed to update route' }));
        return rejectWithValue(err);
      }
      await dispatch(refreshStats({ userId, getToken }));
      return updatedRoute;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    data: { boulder: [], sport: [], gymRoutes: [] },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteRoute.fulfilled, (state, action) => {
        const routeId = action.payload;
        state.data.sport = state.data.sport.filter((r) => r.id !== routeId);
        state.data.boulder = state.data.boulder.filter((r) => r.id !== routeId);
        state.data.gymRoutes = state.data.gymRoutes.filter((r) => r.id !== routeId);
      })
      .addCase(editRoute.fulfilled, (state, action) => {
        const updated = action.payload;
        ['sport', 'boulder', 'gymRoutes'].forEach((cat) => {
          state.data[cat] = state.data[cat].map((r) =>
            r.id === updated.id ? updated : r
          );
        });
      });
  },
});

// Selectors
export const selectAllRoutes = (state) => state.routes.data;
export const selectRoutesStatus = (state) => state.routes.status;
export const selectRoutesError = (state) => state.routes.error;

export const selectRoutesByCategory = createSelector(
  [selectAllRoutes, (_, category) => category],
  (routes, category) => routes[category] || []
);

export const selectFilteredRoutes = createSelector(
  [selectAllRoutes, (_, category) => category, (_, __, searchTerm) => searchTerm],
  (routes, category, searchTerm) => {
    const list = routes[category] || [];
    if (!searchTerm?.trim()) return list;
    return list.filter((r) =>
      (r.title || '').toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }
);

export default routesSlice.reducer;
