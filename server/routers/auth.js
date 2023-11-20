const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.login);
router.get("/signup", authController.signup);
router.get("/complete", authController.complete);
router.get("/error", authController.error);
router.post("/auth/signup", authController.signupForm);
router.post("/auth/login", authController.loginForm);

module.exports = router;
