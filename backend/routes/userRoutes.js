import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//Public Route
router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.route("/login").post(authUser);

//Private Route
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//Private
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

export default router;
