## ADDED Requirements

### Requirement: README descrive lo scopo dell'applicazione
Il README MUST contenere una descrizione chiara dello scopo dell'applicazione climbing-app e degli intenti del progetto.

#### Scenario: Lettura introduzione
- **WHEN** un utente apre il README
- **THEN** il README MUST presentare in modo chiaro cosa fa l'applicazione e a chi è rivolta

### Requirement: README documenta lo stack tecnologico
Il README MUST elencare le tecnologie principali usate nel progetto, sia frontend che backend.

#### Scenario: Consultazione stack
- **WHEN** uno sviluppatore vuole conoscere le tecnologie del progetto
- **THEN** il README MUST elencare frontend (React, Vite, Redux, Tailwind, Clerk), backend (Node.js, Express, MongoDB, MinIO) e infrastruttura (Docker Compose)

### Requirement: README descrive l'architettura
Il README MUST includere una rappresentazione della struttura architetturale del progetto con le relazioni tra i layer.

#### Scenario: Comprensione architettura
- **WHEN** uno sviluppatore vuole capire come sono collegati frontend, backend e infrastruttura
- **THEN** il README MUST mostrare un diagramma testuale (ASCII) o una descrizione strutturata con porte e responsabilità di ogni componente

### Requirement: README documenta la struttura del repository
Il README MUST descrivere l'organizzazione delle cartelle principali del repository.

#### Scenario: Navigazione del codice
- **WHEN** un nuovo sviluppatore esplora il repository
- **THEN** il README MUST descrivere le cartelle principali (src/, backend/, openspec/) e il loro contenuto

### Requirement: README fornisce istruzioni di setup locale
Il README MUST fornire istruzioni step-by-step per avviare il progetto in locale, coprendo prerequisiti, infrastruttura Docker, backend e frontend.

#### Scenario: Primo avvio
- **WHEN** uno sviluppatore vuole avviare il progetto in locale per la prima volta
- **THEN** il README MUST fornire la sequenza completa di comandi: clone → install dipendenze → avvio Docker Compose → avvio backend → avvio frontend

### Requirement: README documenta le variabili d'ambiente
Il README MUST documentare le variabili d'ambiente richieste da frontend e backend, con indicazioni su dove ottenerle.

#### Scenario: Configurazione ambiente
- **WHEN** uno sviluppatore imposta le variabili d'ambiente
- **THEN** il README MUST elencare le variabili richieste per frontend (VITE_CLERK_PUBLISHABLE_KEY) e backend (CLERK_SECRET_KEY, MongoDB URI, MinIO config) con note su come ottenerle
