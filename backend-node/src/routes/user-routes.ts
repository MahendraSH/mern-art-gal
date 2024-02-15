import {
  deleteUserAccount,
  deleteUserById,
  getAllUsers,
  getProfileDetails,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfoById,
  updateUserProfileDetails,
  updateUserProfileImage,
} from "../controllers/user-controllers";
import { Router } from "express";
import { isAdmin } from "../utils/is-admin";
import { isUser } from "../utils/is-user";

const router = Router();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/all").get(isUser, isAdmin, getAllUsers);
router
  .route("/me")
  .get(isUser, getProfileDetails)
  .patch(isUser, updateUserProfileDetails)
  .patch(isUser, updateUserProfileImage)
  .delete(isUser, deleteUserAccount);
router
  .route("/:id")
  .get(isUser, isAdmin, getUserById)
  .patch(isUser, isAdmin, updateUserInfoById)
  .delete(isUser, isAdmin, deleteUserById);

export default router;
