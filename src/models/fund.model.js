const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 500,
    required: true
  },
  description: {
    type: String,
    maxlength: 3000,
    required: true
  },
  fundAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  fundRaiserId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Fund", fundSchema);
