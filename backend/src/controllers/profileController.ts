import { NextFunction, Request, Response } from "express"
import Profile from "../models/profile"
import User from "../models/user"
import { UserProps } from "../types/types"
import Tour from "../models/tour"
import uploadSingleImage from "../middleware/uploadImage"

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
		const { firstName, lastName } = req.body

		// Validate input
		if (!firstName || !lastName) {
			return res
				.status(400)
				.json({ error: "First Name and Last Name are required" })
		}

		// Find user
		const user = (await User.findById(userId)) as UserProps
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		// Find or create profile
		let profile = await Profile.findOne({ user: userId })
		if (!profile) {
			profile = new Profile({ user: userId })
		}

		// Update profile fields
		profile.firstName = firstName
		profile.lastName = lastName

		// Handle image upload (if image data is provided)
		if (req.file) {
			try {
				const uploadFile = await uploadSingleImage(req, res)
				if (uploadFile) {
					profile.imageUri = uploadFile.filename
				}
			} catch (error) {
				console.error("Error uploading image:", error)
				return res.status(400).json({ error: "Failed to upload image" })
			}
		}

		await profile.save()

		res.status(200).json({ message: "Profile updated successfully", profile })
	} catch (error) {
		const err = error as Error
		console.error("Error updating user profile:", err.message)
		res.status(500).json({ error: "An unexpected error occurred" })
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

// Helper function to handle image upload
