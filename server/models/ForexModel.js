const mongoose = require("mongoose");

const ForexSchema = mongoose.Schema({
  pair: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Captures when the price was updated
  },
});

module.exports = mongoose.model("Forex", ForexSchema);
