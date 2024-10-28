const express = require("express");
const { body } = require("express-validator");
const contactController = require("../controllers/ContactController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const router = express.Router();

router.use(AuthMiddleware);

router.post(
  "/search",
  [body("search").notEmpty()],
  handleErrorMessage,
  contactController.searchContacts
);

router.get("/", contactController.getContactForDMList);
router.get("/all", contactController.getAllContacts);

module.exports = router;
