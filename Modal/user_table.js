const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  paid : {
      type:Boolean,
      require:true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
