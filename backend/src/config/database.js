/* eslint-disable no-undef */
const mongoose = require('mongoose');

const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'climbingdb'
    });
    console.log('MongoDB connected successfully with Mongoose');
  }catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

const getDb = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call connectDb first.');
  }
  return mongoose.connection.db;
}

module.exports = {connectDb, getDb};