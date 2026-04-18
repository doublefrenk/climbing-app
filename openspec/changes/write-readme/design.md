## Context

Il README corrente è il template di default generato da Vite e non contiene alcuna informazione sul progetto reale. Il progetto è un'applicazione fullstack con frontend React, backend Node.js/Express, MongoDB e MinIO, autenticazione via Clerk e state management Redux. Chiunque voglia capire o avviare il progetto deve esplorare il codice sorgente senza alcuna guida.

## Goals / Non-Goals

**Goals:**
- Scrivere un README.md completo che sostituisca il template di default
- Documentare architettura e stack tecnologico
- Fornire istruzioni chiare per avviare il progetto in locale
- Descrivere la struttura del repository
- Comunicare gli intenti e lo scopo dell'applicazione

**Non-Goals:**
- Creare documentazione API dettagliata
- Scrivere guide per deployment in produzione
- Aggiungere badge CI/CD o coverage
- Creare file `.env.example` (fuori scope)

## Decisions

1. **Lingua: italiano**
   - Il progetto è personale e i commenti nel codice sono in italiano. Il README sarà in italiano per coerenza.

2. **Struttura del README**
   - Ordine: descrizione → intenti → stack → architettura → struttura repo → setup locale → variabili d'ambiente
   - Rationale: dal generale al particolare, chi legge capisce subito cosa fa l'app e poi trova le istruzioni operative.

3. **Diagramma architettura testuale**
   - Usare ASCII art per visualizzare la struttura frontend/backend/infra senza dipendenze esterne.

4. **Sezione setup locale dettagliata**
   - Documentare la sequenza esatta: Docker Compose per infra → backend → frontend
   - Includere porte usate da ogni servizio

## Risks / Trade-offs

- [Le variabili d'ambiente reali non sono committate] → Documentare i nomi chiave senza valori, con note su dove ottenerli (Clerk dashboard per le chiavi auth)
- [MinIO richiede configurazione bucket] → Verificare se `initializeS3Bucket()` crea il bucket automaticamente e documentarlo di conseguenza
