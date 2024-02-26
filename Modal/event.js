const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  rulebook: {
    type: String,
    required: true,
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
