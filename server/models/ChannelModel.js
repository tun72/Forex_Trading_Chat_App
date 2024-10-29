const mongoose = require("mongoose");
const Message = require("./MessageModel");
const { login } = require("../controllers/AuthController");

const ChannelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", required: false },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ChannelSchema.pre("findOneAndDelete", async function (next) {
  const channel = await this.model.findOne(this.getFilter());

  if (channel) {
    await Message.deleteMany({ channelId: channel._id });
  } else {
    console.log("Channel not found");
  }
  next();
});

module.exports = mongoose.model("Channel", ChannelSchema);
