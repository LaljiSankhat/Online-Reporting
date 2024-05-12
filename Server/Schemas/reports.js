const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  postingDate: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["patholes", "waste", "water"],
    default: "waste",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  file: {
    type: String,
    // required: true,
  },
  isComplited: {
    type: Boolean,
    default: false,
  }
});

exports.Report = mongoose.model("Report", reportSchema);
