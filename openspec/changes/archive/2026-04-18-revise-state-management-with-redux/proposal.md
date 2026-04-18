## Why

Lo state management attuale e distribuito tra componenti, creando duplicazioni di logica, aggiornamenti non coerenti e difficolta nel mantenere sincronizzati dati di routes, statistiche e profilo. Una revisione verso Redux e necessaria ora per migliorare prevedibilita, testabilita e scalabilita dell'applicazione.

## What Changes

- Introdurre uno store Redux centralizzato per gli stati condivisi principali dell'applicazione autenticata.
- Spostare la logica di fetch/update delle route (create, edit, delete, ricerca locale, categoria selezionata) in slice Redux dedicate.
- Spostare la gestione delle statistiche (grade/date) in slice Redux con azioni di refresh coerenti dopo mutazioni route.
- Definire la gestione dello stato UI globale (loading/error) con pattern consistente per operazioni asincrone.
- Ridurre il passaggio di callback via outlet context, sostituendolo con dispatch/selectors dove appropriato.
- Mantenere invariato il contratto API backend esistente per evitare regressioni lato servizio.

## Capabilities

### New Capabilities
- `redux-app-state`: Gestione centralizzata e prevedibile dello stato applicativo condiviso (routes, stats, UI async state).

### Modified Capabilities
- Nessuna capability esistente da modificare (non ci sono spec attive in [openspec/specs](openspec/specs)).

## Impact

- Frontend React: [src/components/App.jsx](src/components/App.jsx), [src/components/Home.jsx](src/components/Home.jsx), [src/components/ClimbingRoutes.jsx](src/components/ClimbingRoutes.jsx), [src/components/RoutesForm.jsx](src/components/RoutesForm.jsx), [src/components/Statistics.jsx](src/components/Statistics.jsx), [src/components/About.jsx](src/components/About.jsx).
- Utility frontend: [src/utils/authFetch.js](src/utils/authFetch.js).
- Nuove dipendenze frontend previste: Redux Toolkit e React-Redux.
- Nessun cambiamento richiesto alle API backend in [backend/src/routes/routeRoutes.js](backend/src/routes/routeRoutes.js) e [backend/src/routes/userRoutes.js](backend/src/routes/userRoutes.js).
- Rischio principale: regressioni su flussi di aggiornamento stats dopo mutazioni route; mitigazione tramite task dedicati di validazione funzionale.
