const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/checkAuth");

// App Routes
router.get("/dashboard", dashboardController.dashboard);
router.get("/dashboard/snippet/:id", dashboardController.viewSnippet);
router.put("/dashboard/snippet/:id", dashboardController.updateSnippet);
router.delete(
  "/dashboard/snippet-delete/:id",
  dashboardController.dashboardDeleteSnippet
);
router.get("/dashboard/add", dashboardController.dashboardAddSnippet);
router.post("/dashboard/add", dashboardController.dashboardAddSnippetSubmit);
router.get("/dashboard/search", dashboardController.dashboardSearch);
router.post("/dashboard/search", dashboardController.dashboardSearchSubmit);

module.exports = router;
