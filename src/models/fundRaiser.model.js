const mongoose = require("mongoose");

const fundRaiserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("FundRaiser", fundRaiserSchema);
