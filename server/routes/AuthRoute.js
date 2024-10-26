const express = require("express");
const { body } = require("express-validator");

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddlewate");
const router = express.Router();


router.post(
  "/signup",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("UserName is required.")
      .isLength({ min: 3 })
      .withMessage("User Name must be 3 character longs."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address."),
  ],

  AuthController.register
);
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address."),
  ],
  AuthController.login
);

router.post("/logout", AuthController.logout);

router.get("/me", AuthMiddleware, AuthController.me);

module.exports = router;
