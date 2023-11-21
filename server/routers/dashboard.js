const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

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

router.get("/todo", dashboardController.todoDash);
router.get("/todo/add", dashboardController.todoAddList);
// router.post("/todo/add", dashboardController.todoAddList);
router.get("/todo/list/:id", dashboardController.viewList);
router.put("/todo/list/:id", dashboardController.updateList);
router.delete("/todo/list/:id", dashboardController.deleteList);

module.exports = router;
