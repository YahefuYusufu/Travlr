import { Request, Response } from "express"
import Profile from "../models/profile"
import mongoose from "mongoose"

interface GridFile extends Express.Multer.File {
	id: mongoose.Types.ObjectId
}

export const uploadImage = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId
		const file = req.file as GridFile // The uploaded file

		if (!file) {
			return res.status(400).json({ success: false, error: "No file uploaded" })
		}

		console.log("File received:", file)

		if (!file.id) {
			return res
				.status(500)
				.json({ success: false, error: "File ID not generated" })
		}

		const imageUri = file.id.toString()
		console.log("File ID:", imageUri)

		// Update the user's profile with the GridFS file ID
		const profile = await Profile.findOneAndUpdate(
			{ user: userId },
			{ imageUri },
			{ new: true, runValidators: true }
		)

		if (!profile) {
			return res
				.status(404)
				.json({ success: false, error: "Profile not found" })
		}

		res.json({
			success: true,
			profile: {
				...profile.toObject(),
				imageUri: imageUri,
			},
		})
	} catch (error) {
		console.error("Error during uploadImage:", error)
		res.status(500).json({
			success: false,
			error: "Server Error",
			message:
				error instanceof Error ? error.message : "An unexpected error occurred",
		})
	}
}
