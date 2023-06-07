const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  files: {
    image: {
      type: String, // Assuming you store the image file path as a string
    },
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
  },
  rigor_rank: {
    type: Number,
    required: true,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
