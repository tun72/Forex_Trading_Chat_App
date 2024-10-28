const Message = require("../models/MessageModel");
const factory = require("../controllers/FactoryHandler");

exports.aliasMessages = (req, res, next) => {
  const user1 = req.user._id;
  const user2 = req.body.id;
  console.log(user2);

  req.query.sort = "timestamp";
  req.filter = {
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  };

  next();
};

exports.getMessages = factory.getAll(Message);
