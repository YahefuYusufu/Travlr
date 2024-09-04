import express from "express"
import { registerUser, loginUser, logout } from "../controllers/authController"

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
router.get("/logout", logout)

export default router
