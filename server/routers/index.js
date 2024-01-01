const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");

// App Routes
router.get("/", authController.login);
router.get("/about", mainController.about);
router.get("/features", mainController.features);
router.get("/faq", mainController.faq);

module.exports = router;
