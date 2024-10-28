const SocketIOServer = require("socket.io");
const Message = require("./models/MessageModel");
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

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender")
      .populate("recipient");

   
      console.log("hit big");
      
    
    if (recipientSocketId) {
      console.log("hit recipient");
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }

    if (senderSocketId) {
      console.log("hit client");
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    console.log("on connect");

    const userId = socket.handshake.query.userId;

    console.log(userId);

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log(`User ID not provided during connection.`);
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

module.exports = setupSocket;
