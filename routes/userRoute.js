const express = require("express");
const userController = require("../controllers/userController");
const {validateBody} = require('../middleware/validateBody')
const {passwordsMatch, isNewUser, hashPassword, isExistingUser, auth} = require('../middleware/authMiddleware')
const {signUpSchema, logInSchema} = require('../schemas/schemas')
const router = express.Router()

router.get("/log-out", userController.logout);

router.get("/check-status", auth, userController.checkStatus);

router.post("/signup", validateBody(signUpSchema), passwordsMatch, isNewUser, hashPassword, userController.signup);

router.post("/log-in", validateBody(logInSchema), isExistingUser, userController.fetchUser);

module.exports = router