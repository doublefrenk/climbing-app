# Climbing App

Un logbook digitale per arrampicatori. Tieni traccia delle vie scalate, analizza le tue statistiche per grado e per mese, gestisci il tuo profilo e la tua galleria fotografica.

## Intenti

Il progetto nasce come strumento personale per monitorare la progressione nell'arrampicata sportiva, boulder e indoor. L'obiettivo è avere un'unica piattaforma dove registrare ogni via scalata, filtrare per categoria, e visualizzare statistiche aggregate nel tempo.

---

## Stack Tecnologico

### Frontend
| Tecnologia | Ruolo |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool e dev server |
| Redux Toolkit | State management centralizzato |
| React Router v7 | Routing client-side |
| Tailwind CSS v4 | Styling |
| Clerk | Autenticazione utenti |
| Recharts | Grafici statistiche |

### Backend
| Tecnologia | Ruolo |
|---|---|
| Node.js + Express 5 | Server HTTP |
| Mongoose + MongoDB 7 | Database |
| Clerk Express | Verifica JWT |
| AWS SDK v3 / MinIO | Storage immagini (S3-compatible) |
| Multer | Upload file |

### Infrastruttura locale
| Servizio | Porta |
|---|---|
| MongoDB | 27017 |
| MinIO (API S3) | 9000 |
| MinIO (Console web) | 9001 |

---

## Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│                                                             │
│  React 19 + Vite                           porta 5173       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Clerk (auth)   Redux Store   React Router           │   │
│  │      │              │              │                 │   │
│  │  sessionSlice  routesSlice    App.jsx                │   │
│  │               statsSlice     Home.jsx                │   │
│  │               uiSlice        ClimbingRoutes.jsx      │   │
│  │                              Statistics.jsx          │   │
│  │                              About.jsx               │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │ authFetch (Bearer JWT)             │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Node.js                          │
│                                                             │
│  Express 5                                 porta 3000       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  clerkMiddleware (verifica JWT su ogni richiesta)    │   │
│  │                                                      │   │
│  │  GET/POST/PUT/DELETE  /api/routes                    │   │
│  │  GET                  /api/routes/stats/grades/:id   │   │
│  │  GET                  /api/routes/stats/date/:id     │   │
│  │  POST                 /api/users/sync                │   │
│  │  POST                 /api/users/upload              │   │
│  │  POST                 /api/users/delete/image        │   │
│  └──────────────────────────────────────────────────────┘   │
│            │                          │                     │
└────────────┼──────────────────────────┼─────────────────────┘
             │                          │
             ▼                          ▼
    ┌─────────────────┐       ┌──────────────────┐
    │   MongoDB 7     │       │   MinIO           │
    │   porta 27017   │       │   porta 9000      │
    │   (via Docker)  │       │   (via Docker)    │
    │                 │       │                   │
    │  climbingdb     │       │  bucket immagini  │
    │  - routes       │       │  (creato auto     │
    │  - users        │       │   all'avvio)      │
    └─────────────────┘       └──────────────────┘
```

Il flusso principale è:
1. L'utente si autentica via Clerk
2. `Home.jsx` fa il bootstrap: sync utente → fetch routes → fetch stats (dispatch Redux)
3. Tutte le schermate leggono dallo store Redux tramite selectors
4. Le mutazioni (create/edit/delete) dispatchano thunk che aggiornano lo store e rinfrescano le statistiche

---

## Struttura del Repository

```
climbing-app/
│
├── main.jsx                  Entry point React (Provider Redux + Clerk + Router)
├── index.html                Template HTML
├── vite.config.js            Configurazione Vite
├── package.json              Dipendenze frontend
│
├── src/
│   ├── components/           Componenti React (App, Home, ClimbingRoutes, ecc.)
│   ├── store/                Redux store e slice (session, routes, stats, ui)
│   └── utils/                Utility (authFetch, compareFrenchGrades)
│
├── backend/
│   ├── src/
│   │   ├── app.js            Setup Express (middleware, routes)
│   │   ├── server.js         Entry point (avvia DB, S3, listen)
│   │   ├── config/           Connessione MongoDB e S3/MinIO
│   │   ├── controller/       Logica dei controller (routes, users, errors)
│   │   ├── middleware/       Auth Clerk, upload Multer
│   │   ├── models/           Mongoose models (Route, User)
│   │   └── routes/           Route Express (/api/routes, /api/users)
│   ├── compose.yaml          Docker Compose (MongoDB + MinIO)
│   └── package.json          Dipendenze backend
│
└── openspec/                 Specifiche di progetto (OpenSpec)
    ├── specs/                Specifiche per capability
    └── changes/              Cambiamenti in corso o archiviati
```

---

## Setup Locale

### Prerequisiti

- Node.js >= 18
- Docker e Docker Compose
- Un account [Clerk](https://clerk.com) (gratuito)

### 1. Clona il repository

```bash
git clone https://github.com/doublefrenk/climbing-app.git
cd climbing-app
```

### 2. Configura le variabili d'ambiente

Crea i file `.env` come descritto nella [sezione variabili d'ambiente](#variabili-dambiente).

### 3. Avvia l'infrastruttura (MongoDB + MinIO)

```bash
cd backend
docker compose up -d
```

Verifica che i container siano in esecuzione:
```bash
docker compose ps
```

### 4. Avvia il backend

```bash
# nella cartella backend/
npm install
npm run dev
```

Il server parte su `http://localhost:3000`.
All'avvio, il backend crea automaticamente il bucket MinIO se non esiste.

### 5. Avvia il frontend

```bash
# nella root del progetto
npm install
npm run dev
```

Il frontend è disponibile su `http://localhost:5173`.

---

## Variabili d'Ambiente

### Frontend — `/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

| Variabile | Descrizione | Dove ottenerla |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Chiave pubblica Clerk | [Dashboard Clerk](https://dashboard.clerk.com) → API Keys |

### Backend — `/backend/.env`

```env
CLERK_SECRET_KEY=sk_test_...
MONGODB_URI=mongodb://root:example@localhost:27017
AWS_BUCKET_NAME=climbing-app
PORT=3000
```

| Variabile | Descrizione | Dove ottenerla |
|---|---|---|
| `CLERK_SECRET_KEY` | Chiave segreta Clerk per verifica JWT | [Dashboard Clerk](https://dashboard.clerk.com) → API Keys |
| `MONGODB_URI` | URI connessione MongoDB | Valore di default compatibile con il Docker Compose incluso |
| `AWS_BUCKET_NAME` | Nome del bucket MinIO per le immagini | Scegli liberamente (es. `climbing-app`) |
| `PORT` | Porta del server backend | Default: `3000` |

> **Nota MinIO**: le credenziali di accesso (`minioadmin` / `minioadmin`) sono hardcoded in `backend/src/config/s3.js` per l'ambiente locale. In produzione andrebbero spostate in variabili d'ambiente.
