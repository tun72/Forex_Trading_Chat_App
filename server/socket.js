const SocketIOServer = require("socket.io");
const Message = require("./models/MessageModel");
const Channel = require("./models/ChannelModel");

const generateForexData = () => {
  const pairs = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/CHF"];

  return pairs.map((pair) => ({
    pair,
    bid: (Math.random() * (1.5 - 1.1) + 1.1).toFixed(5),
    ask: (Math.random() * (1.5 - 1.1) + 1.1).toFixed(5),
    timestamp: new Date().toISOString(),
  }));
};

const setupSocket = (server) => {
  const io = SocketIOServer(server, {
    cors: {
      origin: process.env.FRONTEND,
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  const broadcastForexData = () => {
    console.log("hit");

    // const forexData = generateForexData();
    io.to("Trading").emit("forexUpdate", generateForexData());
  };

  // Set interval to broadcast Forex data every 20 seconds
  setInterval(broadcastForexData, 20000);

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender")
      .populate("recipient");

    if (recipientSocketId) {
      console.log("hit recipient");
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }

    if (senderSocketId) {
      console.log("hit client");
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendChannelMessage = async (recieve) => {
    const { channelId, sender, message, messageType, fileUrl } = recieve;

    const createdMessage = await Message.create({
      sender,
      recipient: null,
      message,
      messageType,
      timestamp: new Date(),
      fileUrl,
      channelId,
    });

    const channel = await Channel.findById(channelId).populate("members");

    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: createdMessage._id },
    });

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender")
      .exec();

    const finalData = { ...messageData._doc, channelId: channel._id };

    if (channel && channel.members) {
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("recieveChannelMessage", finalData);
        }
      });

      const adminSocketId = userSocketMap.get(
        channel.created_by._id.toString()
      );
      if (adminSocketId) {
        io.to(adminSocketId).emit("recieveChannelMessage", finalData);
      }
    }
  };

  io.on("connection", (socket) => {
    console.log("on connect");

    const userId = socket.handshake.query.userId;

    console.log(userId);

    if (userId) {
      userSocketMap.set(userId, socket.id);
      socket.join("Trading");
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log(`User ID not provided during connection.`);
    }

    socket.on("sendMessage", sendMessage);
    socket.on("sendChannelMessage", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

module.exports = setupSocket;

//
