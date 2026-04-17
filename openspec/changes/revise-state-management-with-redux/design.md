## Context

Lo stato frontend e attualmente gestito in modo distribuito (state locale in piu componenti e callback propagate tramite outlet context), con logica asincrona duplicata tra viste che manipolano route e statistiche. Questo rende difficile garantire aggiornamenti coerenti dopo mutazioni CRUD, aumenta il coupling tra componenti e complica il testing. Il vincolo principale e mantenere invariati i contratti API backend esistenti, concentrando la revisione sul solo layer frontend.

## Goals / Non-Goals

**Goals:**
- Centralizzare lo stato condiviso in uno store Redux Toolkit unico per area autenticata.
- Introdurre slice distinte per domain state (routes, stats, ui async state) con thunk per operazioni asincrone.
- Ridurre il passaggio di callback e stato tramite outlet context, favorendo selectors e dispatch.
- Uniformare la gestione loading/error con lifecycle prevedibile (pending/fulfilled/rejected).
- Preservare comportamenti utente esistenti (filtri per categoria, refresh statistiche dopo create/edit/delete).

**Non-Goals:**
- Modificare API backend, schema database o middleware auth.
- Rifare design/UI della applicazione.
- Introdurre caching remoto o sincronizzazione offline.
- Migrare altre librerie di routing o form handling.

## Decisions

1. Usare Redux Toolkit come standard di stato globale
- Rationale: minimizza boilerplate, fornisce pattern opinionato e supporta thunk asincroni.
- Alternative considerate:
  - Context API custom + reducer: meno dipendenze ma peggiore scalabilita e tracciabilita su flussi complessi.
  - Zustand/Jotai: validi, ma Redux Toolkit ha ecosistema e pattern piu consolidati per team e test.

2. Separare lo stato in slice di dominio
- Slice previste: `sessionSlice` (utente sincronizzato), `routesSlice`, `statsSlice`, `uiSlice`.
- Rationale: isolare responsabilita e semplificare test/unit boundaries.
- Alternative considerate:
  - Slice unica applicativa: piu semplice inizialmente ma meno manutenibile.

3. Gestire asincrono con `createAsyncThunk`
- Rationale: standardizza pending/fulfilled/rejected e facilita gestione errori.
- Alternative considerate:
  - Async nei componenti: mantiene frammentazione corrente.
  - RTK Query: potente ma eccessivo per questa revisione iniziale; possibile evoluzione futura.

4. Derivare stato view-specific con selector memoizzati
- Rationale: evita duplicazioni e recompute inutili, soprattutto per filtri categoria/ricerca e dati statistici.
- Alternative considerate:
  - Duplicare stato filtrato localmente: rischio inconsistenze tra viste.

5. Migrazione incrementale per schermata
- Ordine: bootstrap utente e home container -> routes CRUD -> statistics -> about gallery integration.
- Rationale: riduce regressioni e consente verifica funzionale progressiva.
- Alternative considerate:
  - Big-bang migration: meno commit intermedi ma rischio regressioni alto.

## Risks / Trade-offs

- [Rischio regressioni nei refresh statistiche dopo mutazioni route] -> Mitigazione: centralizzare side-effect in thunk e aggiungere checklist di validazione per create/edit/delete.
- [Complessita iniziale aumentata per setup Redux] -> Mitigazione: limitare scope a stati condivisi reali, mantenendo local state per UI strettamente locale (es. apertura modali).
- [Doppia fonte di verita durante migrazione graduale] -> Mitigazione: migrare per schermata completa e rimuovere subito stato legacy correlato.
- [Prestazioni su selector non ottimizzati] -> Mitigazione: usare selectors memoizzati e mantenere shape stato normalizzata dove necessario.

## Migration Plan

1. Aggiungere dipendenze Redux (`@reduxjs/toolkit`, `react-redux`) e configurare store/provider.
2. Introdurre slice e thunk senza rimuovere subito tutta la logica legacy.
3. Migrare il bootstrap dati autenticati e accesso stato globale nei container principali.
4. Migrare CRUD route e refresh stats su dispatch thunk.
5. Migrare schermate statistiche e profilo su selectors globali.
6. Rimuovere outlet context per stato condiviso e callback non piu necessarie.
7. Eseguire validazione funzionale end-to-end su flussi principali.

Rollback strategy:
- Mantenere migrazione in step piccoli per consentire revert di singoli commit se emergono regressioni critiche.

## Open Questions

- Conviene introdurre subito normalizzazione route per id (entity adapter) o rimandarla a fase successiva?
- Le operazioni gallery (upload/delete) devono convergere subito nel `uiSlice` per error/loading globali o rimanere locali in prima iterazione?
- E necessario aggiungere telemetria minima lato frontend per monitorare errori asincroni post-migrazione?
