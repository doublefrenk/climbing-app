/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const { clerkMiddleware, requireAuth } = require('./middleware/auth.js');
const routeRoutes = require('./routes/routeRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const {getDb} = require('./config/database.js');
const globalErrorHandler = require('./controller/errorController.js');


const app = express();

app.use(cors());
app.use(express.json());

// Clerk parses the token on every request (but doesn't block unauthenticated ones)
app.use(clerkMiddleware());

app.use((req, res, next) => {
  console.log(`${req.method}  ${req.path} - ${new Date().toISOString()}`);
  next();
})

// Public routes (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.get('/api/health/db', async (req, res) => {
  getDb();
  res.json({ message: 'Database connection is healthy!' });
});

// Protected routes — require a valid Clerk JWT
app.use('/api/routes', requireAuth(), routeRoutes);
app.use('/api/users', requireAuth(), userRoutes);

app.use(globalErrorHandler);

module.exports = app;
