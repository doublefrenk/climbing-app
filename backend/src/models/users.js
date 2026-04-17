/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId : {
    type: String,
    required: true,
    unique: true
  },
  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  age: {
    type: Number,
    min: 0,
    max: 80,
    required: true,
    default: 18
  },
  location: {
    type: String,
    required: true,
    enum: [
      'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
      'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
      'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic',
      'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece',
      'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan',
      'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia',
      'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Norway', 'Pakistan', 'Peru', 'Philippines',
      'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'Slovakia',
      'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
      'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam'
    ],
    message: 'Please enter a valid nation',
    default: 'Italy'
  },
  climbingLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  photo: {
    type: String
  },
  lastRoute: {
    type: String
  },
  favoriteClimbingStyle: {
    type: String,
    required: true,
    enum: ['boulder', 'sport', 'gymRoutes'],
    default: 'sport'
  },
  motto:{
    type: String,
    maxLength: 100
  },
  gallery: [{
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      maxLength: 100
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
        },
        message: 'Image must be a valid image file format (jpg, jpeg, png, gif, webp)'
      }
    }
  }]
});

module.exports = mongoose.model('User', userSchema);