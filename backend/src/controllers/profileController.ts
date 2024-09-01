import { Request, Response } from "express"
import Profile from "../models/profile"

export const uploadImage = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId
		const filePath = req.file?.path // The path where the file is saved

		console.log("File Path: ", filePath)
		if (!filePath) {
			return res.status(400).json({ success: false, error: "No file uploaded" })
		}

		// Find and update the user's profile with the new image URL
		const profile = await Profile.findOneAndUpdate(
			{ user: userId },
			{ imageUri: filePath }, // Update the profile picture field
			{ new: true }
		)

		console.log("Updated profile:", profile) // Debug log

		if (!profile) {
			return res
				.status(404)
				.json({ success: false, error: "Profile not found" })
		}

		// Respond with the new image URI
		res.json({
			success: true,
			profile: { ...profile.toObject(), imageUri: filePath },
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, error: "Server Error" })
	}
}
