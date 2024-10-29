const express = require("express");
const { body } = require("express-validator");
const channelController = require("../controllers/ChannelController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const { channelMiddleware } = require("../middlewares/ChannelMiddleware");
const { AdminMiddleware } = require("../middlewares/AdminMiddleware");
const router = express.Router();

router.use(AuthMiddleware);

router.post(
  "/",
  AdminMiddleware,
  [body("name").notEmpty()],
  handleErrorMessage,
  channelMiddleware,
  channelController.createChannel
);

router.get("/all", channelController.getUserChannels);
router.get("/:channelId", channelController.getChannelMessages);

router.delete("/:id", channelController.deleteChannel);

module.exports = router;
