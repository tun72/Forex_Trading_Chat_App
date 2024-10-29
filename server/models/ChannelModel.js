const mongoose = require("mongoose");
const Message = require("./MessageModel");

const fs = require("fs").promises;

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

const deleteFiles = async (messages) => {
  const deletePromises = messages
    .filter((msg) => msg.messageType === "file")
    .map((msg) => {
      return fs.unlink(msg.fileUrl).catch((error) => {
        console.error(`Failed to delete file: ${msg.fileUrl}`, error);
      });
    });

  await Promise.all(deletePromises);
};

ChannelSchema.pre("findOneAndDelete", async function (next) {
  const channel = await this.model.findOne(this.getFilter());

  if (channel) {
    // Find all messages for the channel
    const messages = await Message.find({ channelId: channel._id });

    // Delete files associated with each message
    await deleteFiles(messages);

    // Delete messages from the database
    await Message.deleteMany({ channelId: channel._id });
  } else {
    console.log("Channel not found");
  }

  next();
});

module.exports = mongoose.model("Channel", ChannelSchema);
