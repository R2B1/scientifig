const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const FigureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  figureJSON: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Figure = mongoose.model("figure", FigureSchema);
