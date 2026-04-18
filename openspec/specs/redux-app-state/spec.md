## Requirements

### Requirement: Centralized shared app state
The frontend application MUST manage shared authenticated state through a single Redux store, including user session data, route collections, statistics data, and global async status.

#### Scenario: Store initialization for authenticated area
- **WHEN** an authenticated user enters the application shell
- **THEN** the system MUST initialize the Redux store and expose state through React-Redux Provider

### Requirement: Route domain state orchestration
The system SHALL manage route retrieval, creation, update, and deletion through Redux actions/thunks, and SHALL keep the route collections in sync across all screens that consume them.

#### Scenario: Route list consistency after mutation
- **WHEN** a route create, update, or delete operation succeeds
- **THEN** the Redux route state MUST reflect the updated data and all consuming views MUST render consistent route information

### Requirement: Statistics refresh consistency
The system MUST orchestrate statistics refresh from Redux after route mutations that change user route history.

#### Scenario: Stats refresh after route creation
- **WHEN** a route is created and persisted successfully
- **THEN** the system MUST trigger statistics refresh and update charts/tables from the Redux statistics state

### Requirement: Unified async loading and error state
The application MUST represent async operation lifecycle with standardized pending, success, and error state in Redux for shared domain operations.

#### Scenario: Error propagation on failed update
- **WHEN** a route update request fails
- **THEN** Redux MUST store the failure state and the UI MUST render an error view or message based on that shared error state

### Requirement: Reduced callback propagation for shared concerns
Components SHALL consume shared domain data via selectors and trigger shared operations via dispatch, instead of passing multi-level callback chains for the same concerns.

#### Scenario: Shared data consumption in nested route view
- **WHEN** a nested route view needs route collections and statistics
- **THEN** the view MUST read them through Redux selectors without requiring outlet-context callback wiring for those shared operations
