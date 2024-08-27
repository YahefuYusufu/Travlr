import express from "express"
import {
	registerUser,
	loginUser,
	logout,
	createUserProfile,
	getUserProfileById,
	getAllUsers,
	updateUserProfile,
	deleteUser,
} from "../controllers/authController"
import { authenticateToken } from "../middleware/authMiddleware"
import { Request, Response } from "express"
const router = express.Router()

//Protected route
// Optional: Protected route (without token-based authentication)
router.get("/protected-route", (req, res) => {
	// Implement basic authentication logic here (e.g., check for session)
	// If user is authenticated, send a success message
	res.json({ message: "Protected route accessed" })
})

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logout)
router.get("/", getAllUsers)
router.post("/profile/:userId", createUserProfile)
router.get("/profile/:userId", getUserProfileById)
router.put("/profile/:userId", updateUserProfile)
router.delete("/:userId", deleteUser)

export default router
