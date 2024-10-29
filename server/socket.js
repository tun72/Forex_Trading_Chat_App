const SocketIOServer = require("socket.io");
const Message = require("./models/MessageModel");
const Channel = require("./models/ChannelModel");
const ForexLog = require("./models/ForexModel");

const catchAsync = require("./utils/catchAsync");

const generateForexData = (count) => {
  const pairs = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/CHF"];

  const data = [];
  for (let i = 0; i < count; i++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)]; // Randomly select a currency pair
    data.push({
      pair,
      bid: parseFloat((Math.random() * (1.5 - 1.1) + 1.1).toFixed(5)), // Random bid price between 1.1 and 1.5
      ask: parseFloat((Math.random() * (1.5 - 1.1) + 1.1).toFixed(5)), // Random ask price between 1.1 and 1.5
      timestamp: new Date(), // Current timestamp
    });
  }

  return data;
};

const saveUpdateForexLogData = catchAsync(async (newForexLogData) => {
  const data = newForexLogData.map((data) => ({
    ...data,
    price: (data.bid + data.ask) / 2,
  }));

  await ForexLog.insertMany(data);
});

const setupSocket = (server) => {
  const io = SocketIOServer(server, {
    cors: {
      origin: process.env.FRONTEND,
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const broadcastForexData = async () => {
    const forexData = generateForexData(5); // Generate 15 entries

    await saveUpdateForexLogData(forexData);

    io.to("Trading").emit("forexUpdate", forexData);
  };

  // Set interval to broadcast Forex data every 20 seconds
  setInterval(broadcastForexData, 60000);

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender")
      .populate("recipient");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }

    if (senderSocketId) {
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

  const notifyMembers = async (value) => {
    const createdMessage = await Message.create({
      sender: null,
      recipient: null,
      message: value.message,
      messageType: "text",
      timestamp: new Date(),
      fileUrl: null,
      channelId: value.channelId,
    });

    const messageData = await Message.findById(createdMessage._id).exec();

    const finalData = { ...messageData._doc, channelId: createdMessage._id };

    const channel = await Channel.findById(createdMessage._id).populate(
      "members"
    );

    if (channel && channel.members) {
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("joinAndLeaveChannel", finalData);
        }
      });

      const adminSocketId = userSocketMap.get(
        channel.created_by._id.toString()
      );
      if (adminSocketId) {
        io.to(adminSocketId).emit("joinAndLeaveChannel", finalData);
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      socket.join("Trading");
      broadcastForexData();
      io.emit("onlineUsers", Array.from(userSocketMap.keys()));
    } else {
      console.log(`User ID not provided during connection.`);
    }
    socket.on("sendMessage", sendMessage);
    socket.on("sendChannelMessage", sendChannelMessage);
    socket.on("joinAndLeaveChannel", notifyMembers);
    socket.on("disconnect", () => disconnect(socket));
  });
};

module.exports = setupSocket;

//
