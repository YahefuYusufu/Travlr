import express from "express"
import {
	registerUser,
	loginUser,
	logout,
	getUserProfileById,
	getAllUsers,
	updateUserProfile,
	deleteUser,
	getUserProfile,
} from "../controllers/authController"
import { authenticateToken } from "../middleware/authMiddleware"
import upload from "../middleware/imageStorage"
import { uploadImage } from "../controllers/profileController"

const router = express.Router()

// Optional: Protected route (without token-based authentication)
router.get("/protected-route", (req, res) => {
	// Implement basic authentication logic here (e.g., check for session)
	// If user is authenticated, send a success message
	res.json({ message: "Protected route accessed" })
})

// Register a new user
router.post("/register", registerUser)

// Log in an existing user
router.post("/login", loginUser)

// Log out the current user
router.post("/logout", logout)

// Get all users
router.get("/", getAllUsers)

// Retrieve user profile by ID
// router.get("/profile/:userId", getUserProfileById)

// Retrieve user profile by ID
router.get("/profile/:userId", getUserProfileById) // Use getUserProfile here

// Update user profile by ID
router.put("/profileUpdate/:userId", updateUserProfile) // Use PUT for updating profile

// Delete a user by ID
router.delete("/:userId", deleteUser)

router.post("/profile/:userId/upload", upload.single("photo"), uploadImage)

export default router
