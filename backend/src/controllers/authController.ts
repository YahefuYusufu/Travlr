import { NextFunction, Request, Response } from "express"
import User from "../models/user"

import bcrypt from "bcryptjs"
import { DuplicateEmailError } from "../utils/DuplicateEmailError"
import Tour from "../models/tour"
import Profile from "../models/profile"
import { ProfileProps } from "../types/Profile"
require("dotenv").config()

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password, firstName, lastName } = req.body

		// Validate that firstName and lastName are provided
		if (!firstName || !lastName) {
			return res
				.status(400)
				.json({ error: "First Name and Last Name are required" })
		}

		// Check for duplicate email
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return next(new DuplicateEmailError("Email already exists"))
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			email,
			password: hashedPassword,
		})

		const savedUser = await user.save()

		// Create the profile with firstName and lastName
		const profile = new Profile({
			user: savedUser._id,
			firstName: firstName || "",
			lastName: lastName || "",
			picture: "",
		})

		await profile.save()

		res.status(201).json({
			message: "User registered successfully",
			success: true,
			user: {
				_id: savedUser._id,
				email: savedUser.email,
			},
		})
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
		next(error)
	}
}
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email }).select("+password")

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		res
			.status(200)
			.json({ message: "Login successful", user: { _id: user._id, email } })
	} catch (error) {
		const err = error as Error
		console.error("Error logging in user:", err.message)
		res.status(500).json({ error: "Internal server error" })
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "Logged out successfully" })
	} catch (error) {
		const err = error as Error
		console.error("Error logging out user:", err.message)
		res.status(500).json({ error: "Internal server error" })
	}
}

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		// Find the user by ID and populate the profile field

		const { userId } = req.params

		console.log("User ID from params:", userId)
		const user = await User.findById(userId).populate("profile")
		console.log("User before population:", user)
		console.log("User after population:", user)

		// Check if the user exists
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		// Extract the profile details if they exist
		const profile = user.profile as ProfileProps | undefined

		// Construct the user profile response
		const userProfile = {
			_id: user._id,
			email: user.email,
			firstName: profile?.firstName || "",
			lastName: profile?.lastName || "",
			picture: profile?.picture || "",
		}

		// Return the combined user and profile data
		res.json({ user: userProfile })
	} catch (error) {
		console.error("Error fetching user profile:", error) // Log error for debugging
		res.status(500).json({
			error: "An unexpected error occurred while fetching the user profile",
		})
	}
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

export const createUserProfile = async (req: Request, res: Response) => {
	try {
		const { userId, firstName, lastName, picture } = req.body

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const profile = new Profile({
			user: userId,
			firstName,
			lastName,
			picture,
		})

		await profile.save()

		res.status(201).json({ message: "Profile created successfully" })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
	}
	return undefined
}

export const getUserProfileById = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({
				error: "User not found",
			})
		}

		const profile = await Profile.findOne({ user: userId })
		if (!profile) {
			return res.status(404).json({ error: "Profile not found" })
		}

		res.status(200).json({ profile })
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
	return undefined
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
			await Profile.findByIdAndDelete(user.profile._id) // Delete the profile
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

export const updateUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params
		const { firstName, lastName, picture } = req.body

		// Validate input
		if (!firstName || !lastName) {
			return res
				.status(400)
				.json({ error: "First Name and Last Name are required" })
		}

		// Find user and update profile
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		let profile = await Profile.findOne({ user: userId })
		if (!profile) {
			profile = new Profile({ user: userId, firstName, lastName, picture })
		} else {
			profile.firstName = firstName
			profile.lastName = lastName
			profile.picture = picture
		}

		await profile.save()

		res.status(200).json({ message: "Profile updated successfully", profile })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
		next(error)
	}
}
