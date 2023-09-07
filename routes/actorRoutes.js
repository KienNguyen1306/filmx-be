// routes/actorRoutes.js
const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const ActorController = require("../controllers/ActorController");

const router = express.Router();

// Định nghĩa các route cho bảng Actor
router.get("/", ActorController.getAllActors);
router.post("/actors", isAuthenticated, isAdmin, ActorController.createActor);
router.put(
  "/actors/:id",
  isAuthenticated,
  isAdmin,
  ActorController.updateActor
);
router.delete(
  "/actors/:id",
  isAuthenticated,
  isAdmin,
  ActorController.deleteActor
);

module.exports = router;
