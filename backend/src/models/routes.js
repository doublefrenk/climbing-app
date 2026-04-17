/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['boulder', 'sport', 'gymRoutes']
  },
  id:{
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[1-9][abc]?[+]?$/.test(v);
      },
      message: "Grade must be in French format (e.g., 6a, 7b+, 8c)"
    }
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  genre: {
    type: String,
    enum: ['crimpy', 'slab', 'overhang', 'cruxy', 'finger crack', 'diedhral', 'traverse', 'arete', 'hand arete']
  }, 
  comments: {
    type: [String],
    default: []
  },
  sendDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    min: 1,
    default: 1
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps: true,
  collection: 'routes'
}
);
module.exports = mongoose.model('Route', routeSchema);