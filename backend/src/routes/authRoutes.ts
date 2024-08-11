import express from "express"
import {
	registerUser,
	loginUser,
	createUserProfile,
	getUserProfileById,
	getAllUsers,
} from "../controllers/authController"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", getAllUsers)
router.post("/:userId/profile", createUserProfile)
router.get("/:userId/profile", getUserProfileById)

export default router
