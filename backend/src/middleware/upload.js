/* eslint-disable no-undef */
const multer = require('multer');
const multerS3 = require('multer-s3');
const {s3} = require('../config/s3.js');
require('dotenv').config();

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const userId = req.body.userId || 'unknown';
      const title = req.body.title || 'untitled';

      const fileKey = `users/${userId}/gallery/${title}`;

      cb(null, fileKey);
    }
  })
})