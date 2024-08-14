import { NextFunction, Request, Response } from "express"
import User from "../models/user"
import Profile from "../models/profile"
// import Tour from "../models/tour"
import bcrypt from "bcryptjs"
import { DuplicateEmailError } from "../utils/DuplicateEmailError"
import jwt from "jsonwebtoken"
require("dotenv").config()

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body

		// Check for duplicate email
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return next(new DuplicateEmailError("Email already exists"))
		}

		// Basic password hashing (replace with a stronger hashing algorithm)
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			email,
			password: hashedPassword,
		})

		const savedUser = await user.save()

		res
			.status(201)
			.json({ message: "User registered successfully", user: savedUser })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
		next(error)
	}
}
//token based
// export const loginUser = async (req: Request, res: Response) => {
// 	try {
// 		const { email, password } = req.body

// 		// Find user by email and include password field
// 		const user = await User.findOne({ email }).select("+password")

// 		if (!user) {
// 			return res.status(401).json({ error: "Invalid credentials" })
// 		}

// 		// Validate password
// 		const isPasswordCorrect = await bcrypt.compare(password, user.password)
// 		if (!isPasswordCorrect) {
// 			return res.status(401).json({ error: "Invalid   credentials" })
// 		}

// 		// Generate JWT token
// 		const token = jwt.sign(
// 			{ userId: user._id },
// 			process.env.JWT_SECRE as string,
// 			{
// 				expiresIn: "1h",
// 				// Set expiration time (e.g., 1 hour)
// 			}
// 		)
// 		console.log("created token", token)
// 		// Respond with token and limited user data
// 		res.status(200).json({ token, user: { _id: user._id, email } })
// 	} catch (error) {
// 		const err = error as Error
// 		console.error("Error logging in user:", err.message)
// 		res.status(500).json({ error: "Internal server error" })
// 	}
// 	return undefined
// }
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

export const updateUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId
		const { firstName, lastName, picture } = req.body

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const profile = await Profile.findOne({ user: userId })
		if (!profile) {
			return res.status(404).json({ error: "Profile not found" })
		}

		profile.firstName = firstName || profile.firstName
		profile.lastName = lastName || profile.lastName
		profile.picture = picture || profile.picture

		await profile.save()

		res.status(200).json({ message: "Profile updated successfully" })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
	}
	return undefined
}

// export const deleteUser = async (req: Request, res: Response) => {
// 	try {
// 		const userId = req.params.userId

// 		// Find and delete the user
// 		const user = await User.findByIdAndDelete(userId)
// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" })
// 		}

// 		// Delete the associated profile
// 		await Profile.deleteOne({ user: userId })

// 		// Delete related tours (assuming a Tour model exists)
// 		await Tour.deleteMany({ creator: userId })

// 		res
// 			.status(204)
// 			.json({ message: "User and associated data deleted successfully" })
// 	} catch (error) {
// 		const err = error as Error
// 		res.status(500).json({ error: err.message })
// 	}
// 	return undefined
// }
