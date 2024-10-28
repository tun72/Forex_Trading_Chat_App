const express = require("express");
const { body } = require("express-validator");
const messageController = require("../controllers/MessageController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const router = express.Router();

router.use(AuthMiddleware);

router.post(
  "/",
  [body("id").notEmpty()],
  handleErrorMessage,
  messageController.aliasMessages,
  messageController.getMessages
);

module.exports = router;
