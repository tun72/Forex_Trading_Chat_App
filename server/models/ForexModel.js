const mongoose = require("mongoose");

const ForexSchema = mongoose.Schema({
  pair: { type: String, required: true }, // e.g., "EUR/USD"

  price: { type: Number, required: true }, // price
  timestamp: { type: Date, default: Date.now() } // Timestamp of the quote
});

module.exports = mongoose.model("Forex", ForexSchema);