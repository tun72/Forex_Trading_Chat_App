const express = require("express");
const { body } = require("express-validator");
const channelController = require("../controllers/ChannelController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const { channelMiddleware } = require("../middlewares/ChannelMiddleware");
const router = express.Router();

router.use(AuthMiddleware);

router.post(
  "/",
  [body("name").notEmpty()],
  handleErrorMessage,
  channelMiddleware,
  channelController.createChannel
);




router.get("/all", channelController.getUserChannels);
router.get("/:channelId", channelController.getChannelMessages);

module.exports = router;
