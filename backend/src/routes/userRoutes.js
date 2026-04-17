/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {upload} = require('../middleware/upload.js');
const express = require('express');
const userController = require('../controller/userController.js');

const router = express.Router();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/sync', userController.sync);
router.post('/upload', upload.single('image'), userController.uploadImage);
router.post('/delete/image', userController.deleteImage);




module.exports = router;