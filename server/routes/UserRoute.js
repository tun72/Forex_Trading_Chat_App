const express = require("express");

const userController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const router = express.Router();

router.use(AuthMiddleware);

router.route("/").get(userController.getAllUsers);

router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
