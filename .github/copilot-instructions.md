# Copilot Instructions

This project is a climbing app with a multi-agent development team. Before responding to any request, evaluate whether a specialized agent should handle it.

## Agent Routing

Five custom agents are available in `.github/agents/`. Route requests as follows:

### Use `agent-team-leader` when:
- The request involves **both frontend and backend** work
- The task requires coordinating multiple parts of the codebase
- You are unsure whether the work is frontend, backend, or both
- The user asks for a "feature" without specifying a layer

The Team Leader is the **only agent that writes to the filesystem**. It delegates to subagents, collects proposals and reviews, then applies the final result.

### Use `agent-backend` when:
- The request touches **Node.js, Express 5, MongoDB/Mongoose, Clerk auth, or MinIO/S3**
- Files involved are in `backend/src/` (controllers, routes, models, middleware, config)
- The user asks for a new API endpoint, a model change, or server-side logic

The Backend Subagent produces **code proposals only** — it does not write files. The Team Leader applies the approved code.

### Use `agent-backend-reviewer` when:
- A backend code proposal needs to be **reviewed before being applied**
- You want to validate that a backend change follows project patterns (catchAsync, AppError, Mongoose schema validation, etc.)

### Use `agent-frontend` when:
- The request touches **React 19, Vite, Tailwind v4, React Router v7, or Clerk React**
- Files involved are in `frontend/src/` (components, pages, hooks, services)
- The user asks for a UI change, a new page, or client-side logic

The Frontend Subagent produces **code proposals only** — it does not write files.

### Use `agent-frontend-reviewer` when:
- A frontend code proposal needs to be **reviewed before being applied**
- You want to validate that a frontend change follows project patterns (functional components, hooks, Tailwind classes, no inline styles, etc.)

---

## Decision Guide

```
User request
     │
     ├── Touches both frontend AND backend?
     │        └── YES → agent-team-leader
     │
     ├── Backend only (API, DB, server)?
     │        └── YES → agent-backend (then agent-backend-reviewer before applying)
     │
     ├── Frontend only (UI, components, pages)?
     │        └── YES → agent-frontend (then agent-frontend-reviewer before applying)
     │
     └── General question, refactor, or unclear scope?
              └── Use agent-team-leader to analyze and decompose
```

---

## Stack Reference

| Layer | Technology |
|---|---|
| Backend runtime | Node.js (CommonJS) |
| Backend framework | Express 5 |
| Database | MongoDB 7 + Mongoose 9 |
| Auth | Clerk (backend: `clerkMiddleware`/`requireAuth`, frontend: Clerk React SDK) |
| File storage | MinIO (S3-compatible) via `@aws-sdk/client-s3` v3 + Multer |
| Frontend framework | React 19 (functional components + hooks only) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Language | JavaScript only — no TypeScript |

---

## Key Constraints

- **No TypeScript** anywhere in the project
- Backend uses **CommonJS** (`require`/`module.exports`), not ESM
- All async controllers must be wrapped in `catchAsync`
- All operational errors must use `AppError`
- Only the **Team Leader** writes to the filesystem; subagents produce proposals
