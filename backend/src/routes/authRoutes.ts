import express from "express"
import {
	registerUser,
	loginUser,
	createUserProfile,
	getUserProfileById,
	getAllUsers,
	updateUserProfile,
	forgotPassword,
	resetPassword,
} from "../controllers/authController"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", getAllUsers)
router.post("/:userId/profile", createUserProfile)
router.get("/:userId/profile", getUserProfileById)
router.put("/:userId/profile", updateUserProfile)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router
