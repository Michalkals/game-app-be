const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const {
  passwordMatch,
  isNewUser,
  auth,
} = require("../middleware/authMiddleware");
const { signupSchema, loginSchema } = require("../schemas/schemas");
const router = express.Router();

router.get("/log-out", userController.logout); // fix it

router.get("/check-status", auth, userController.checkStatus); // fix it

router.get("/all-users", userController.users)

router.post(
  "/signup",
  validateBody(signupSchema),
  passwordMatch,
  isNewUser,
  userController.signup
);

router.post("/login", validateBody(loginSchema), userController.login);

router.post(
  "/add-to-games-played",
  auth,
  userController.gamesPlayed
)

module.exports = router;
