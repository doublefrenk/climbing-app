/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const routeController = require('../controller/routeController.js');

const router = express.Router();

router.get('/', routeController.getAllRoutes);
router.get('/stats/grades/:id', routeController.getGradeStats);
router.get('/stats/date/:id', routeController.getDateStats)
router.post('/', routeController.createRoute);
router.get('/:id', routeController.getRouteById);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);

module.exports = router;