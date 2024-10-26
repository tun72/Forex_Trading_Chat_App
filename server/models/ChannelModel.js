const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    members: {
      type: Number,
      required: true,
    },
    created_by: {
      type: String,
    },

    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", ChannelSchema);
