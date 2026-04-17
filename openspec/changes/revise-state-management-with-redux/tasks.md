## 1. Redux Foundation Setup

- [ ] 1.1 Install and configure `@reduxjs/toolkit` and `react-redux` in the frontend workspace
- [ ] 1.2 Create base store setup (store, root reducer, typed hooks pattern if needed) and wire Provider at app entry
- [ ] 1.3 Define initial shared state shape for `session`, `routes`, `stats`, and `ui` slices

## 2. Domain Slices and Async Flows

- [ ] 2.1 Implement `session` slice for authenticated user bootstrap/sync state
- [ ] 2.2 Implement `routes` slice with thunks for fetch/create/update/delete and category-aware selectors
- [ ] 2.3 Implement `stats` slice with thunks for grade/date aggregation refresh
- [ ] 2.4 Implement `ui` slice for standardized loading/error lifecycle across shared async operations

## 3. Screen Migration to Redux

- [ ] 3.1 Refactor authenticated shell and home container to dispatch bootstrap thunks and consume selectors
- [ ] 3.2 Refactor routes list and add/edit/delete flows to use dispatch/selectors instead of outlet callback chains
- [ ] 3.3 Refactor statistics screen to consume Redux-driven route/stat datasets
- [ ] 3.4 Refactor about/profile shared data reads (and related async states) to Redux where state is cross-screen

## 4. Legacy Cleanup and Consistency

- [ ] 4.1 Remove obsolete outlet-context shared state plumbing replaced by Redux
- [ ] 4.2 Eliminate duplicated local async/error logic now covered by shared slices
- [ ] 4.3 Ensure route mutations always trigger consistent statistics refresh through centralized thunks

## 5. Validation and Hardening

- [ ] 5.1 Run lint/build and resolve migration regressions introduced by Redux adoption
- [ ] 5.2 Execute functional checks for login bootstrap, routes CRUD, filtering, pagination, and statistics updates
- [ ] 5.3 Verify error/loading UX paths for failed async operations across migrated screens
- [ ] 5.4 Document migration notes and follow-up items (e.g., possible RTK Query or entity normalization phase)
