## 1. Redux Foundation Setup

- [x] 1.1 Install and configure `@reduxjs/toolkit` and `react-redux` in the frontend workspace
- [x] 1.2 Create base store setup (store, root reducer, typed hooks pattern if needed) and wire Provider at app entry
- [x] 1.3 Define initial shared state shape for `session`, `routes`, `stats`, and `ui` slices

## 2. Domain Slices and Async Flows

- [x] 2.1 Implement `session` slice for authenticated user bootstrap/sync state
- [x] 2.2 Implement `routes` slice with thunks for fetch/create/update/delete and category-aware selectors
- [x] 2.3 Implement `stats` slice with thunks for grade/date aggregation refresh
- [x] 2.4 Implement `ui` slice for standardized loading/error lifecycle across shared async operations

## 3. Screen Migration to Redux

- [x] 3.1 Refactor authenticated shell and home container to dispatch bootstrap thunks and consume selectors
- [x] 3.2 Refactor routes list and add/edit/delete flows to use dispatch/selectors instead of outlet callback chains
- [x] 3.3 Refactor statistics screen to consume Redux-driven route/stat datasets
- [x] 3.4 Refactor about/profile shared data reads (and related async states) to Redux where state is cross-screen

## 4. Legacy Cleanup and Consistency

- [x] 4.1 Remove obsolete outlet-context shared state plumbing replaced by Redux
- [x] 4.2 Eliminate duplicated local async/error logic now covered by shared slices
- [x] 4.3 Ensure route mutations always trigger consistent statistics refresh through centralized thunks

## 5. Validation and Hardening

- [x] 5.1 Run lint/build and resolve migration regressions introduced by Redux adoption
- [x] 5.2 Execute functional checks for login bootstrap, routes CRUD, filtering, pagination, and statistics updates
- [x] 5.3 Verify error/loading UX paths for failed async operations across migrated screens
- [x] 5.4 Document migration notes and follow-up items (e.g., possible RTK Query or entity normalization phase)

---

## Migration Notes

### What was done
- Installed `@reduxjs/toolkit` and `react-redux`.
- Created `src/store/` with: `store.js`, `sessionSlice.js`, `routesSlice.js`, `statsSlice.js`, `uiSlice.js`.
- Wired `<Provider store={store}>` in `main.jsx` wrapping the entire app.
- `App.jsx`: removed the `homeLoader` async function and router creation inside the component; router is now a module-level constant (no re-creation on render).
- `Home.jsx`: bootstraps session via `syncSession` thunk on mount; fetches routes and stats once `userData._id` is available. No longer passes anything via `<Outlet context>`.
- `ClimbingRoutes.jsx`: reads routes from Redux selector; dispatches `deleteRoute`/`editRoute` thunks directly.
- `RoutesForm.jsx`: dispatches `addRoute` thunk directly.
- `Statistics.jsx`: reads `statsGrades`/`statsDate` from Redux selectors.
- `About.jsx`: reads `user` and `routes` from Redux selectors; gallery operations remain local state (screen-specific, no cross-screen sharing needed).
- `uiSlice` aggregates loading/error state from all shared async thunks via `extraReducers`.
- Stats refresh is always triggered inside `addRoute`, `deleteRoute`, and `editRoute` thunks — centralized and consistent.

### serializability note
`getToken` (a function) is stored in `session.getToken` to make it accessible to thunks dispatched from anywhere. The Redux serializable check is configured to ignore this path and its setter action.

### Follow-up items
- Consider introducing RTK Query for remote data caching and background refetch (especially for routes and stats).
- Consider `createEntityAdapter` for normalized route storage if route collections grow large.
- Gallery operations (upload/delete) currently use local state in `About`; could be moved to a `gallerySlice` if they need to be cross-screen.
- The `selectFilteredRoutes` memoized selector exists in `routesSlice.js` and can replace the inline filter in `ClimbingRoutes` if preferred.
