import { Request, Response } from "express"
import mongoose from "mongoose"
import Profile from "../models/profile"

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

		// Update the user's profile with the GridFS file ID (or filename)
		const profile = await Profile.findOneAndUpdate(
			{ user: userId },
			{ imageUri: file.id.toString() },
			{ new: true }
		)

		if (!profile) {
			return res
				.status(404)
				.json({ success: false, error: "Profile not found" })
		}

		res.json({ success: true, profile })
	} catch (error) {
		console.error("Error during uploadImage:", error)
		res.status(500).json({ success: false, error: "Server Error" })
	}
}
