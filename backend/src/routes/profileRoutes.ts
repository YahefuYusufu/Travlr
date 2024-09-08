import express from "express"
import {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} from "../controllers/profileController"
// import router from "./authRoutes"
import uploadSingleImage from "../middleware/uploadImage"
import Profile from "../models/profile"

const router = express.Router()
router.get("/users", getAllUsers)
router.get("/users/:userId", getUserProfile)
// Upload an image
router.post("/users/:userId/upload", uploadSingleImage, (req, res) => {
	if (req.file) {
		res.json({ filename: req.file.filename })
	} else {
		res.status(400).json({ error: "No file uploaded" })
	}
})

// Update user profile
router.post("/users/:userId", async (req, res) => {
	try {
		const { userId } = req.params
		const { firstName, lastName, imageUri } = req.body

		if (!firstName || !lastName) {
			return res
				.status(400)
				.json({ error: "First Name and Last Name are required" })
		}

		// Find or create user profile
		let profile = await Profile.findOne({ user: userId })
		if (!profile) {
			profile = new Profile({ user: userId })
		}

		profile.firstName = firstName
		profile.lastName = lastName
		profile.imageUri = imageUri || profile.imageUri

		await profile.save()

		res.status(200).json({ message: "Profile updated successfully", profile })
	} catch (error) {
		console.error("Error updating profile:", error)
		res.status(500).json({ error: "An unexpected error occurred" })
	}
})

router.delete("/users/:userId", deleteUser)

export default router
