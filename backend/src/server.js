/* eslint-disable no-undef */

require('dotenv').config();
const {connectDb} = require('./config/database.js');
const { initializeS3Bucket } = require('./config/s3.js');
const app = require('./app.js');

const PORT = process.env.PORT || 3001;

connectDb();
initializeS3Bucket();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});