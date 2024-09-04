import { NextFunction, Request, Response } from "express"
import Profile from "../models/profile"
import mongoose from "mongoose"
import User from "../models/user"
import { UserProps } from "../types/types"

interface GridFile extends Express.Multer.File {
	id: mongoose.Types.ObjectId
}
export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await User.find()
		res.status(200).json({ users })
	} catch (error) {
		const err = error as Error
		res.status(500).json({
			error: err.message,
		})
	}
}
export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const profile = await Profile.findOne({ user: userId })
		if (!profile) {
			return res.status(404).json({ error: "Profile not found" })
		}

		const userProfile = {
			_id: user._id,
			email: user.email,
			firstName: profile.firstName || "",
			lastName: profile.lastName || "",
			imageUri: profile.imageUri || "",
		}

		res.json({ user: userProfile })
	} catch (error) {
		console.error("Error fetching user profile:", error)
		res.status(500).json({
			error: "An unexpected error occurred while fetching the user profile",
		})
	}
}
export const updateUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params
		const { firstName, lastName, imageUri } = req.body

		// Validate input
		if (!firstName || !lastName) {
			return res
				.status(400)
				.json({ error: "First Name and Last Name are required" })
		}

		// Find user and update profile
		const user = (await User.findById(userId)) as UserProps
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		let profile = await Profile.findOne({ user: userId })
		if (!profile) {
			profile = new Profile({ user: userId, firstName, lastName, imageUri })
		} else {
			profile.firstName = firstName
			profile.lastName = lastName
			profile.imageUri = imageUri
		}

		await profile.save()

		res.status(200).json({ message: "Profile updated successfully", profile })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
		next(error)
	}
}
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId

		const user = await User.findByIdAndDelete(userId).populate("profile")

		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		// Check if a profile is associated with the user
		if (user.profile) {
			// await Profile.findByIdAndDelete(user.) // Delete the profile
		}

		// Delete related tours (assuming a Tour model exists)
		await Tour.deleteMany({ creator: userId })

		res
			.status(204)
			.json({ message: "User and associated data deleted successfully" })
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
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
