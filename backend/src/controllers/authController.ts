import { NextFunction, Request, Response } from "express"
import User from "../models/user"
import Profile from "../models/profile"
// import Tour from "../models/tour"
import bcrypt from "bcryptjs"
import { DuplicateEmailError } from "../utils/DuplicateEmailError"

import PasswordResetToken from "../models/passwordReset"
import { sendEmail } from "../utils/sendEmail"
import { generateRandomString } from "../utils/generateString"

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

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email }).select("+password") // Include password for comparison

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
		res.status(500).json({ error: err.message })
	}
	return undefined
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

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body

		// Find user by email
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		// Generate reset token
		const resetToken = generateRandomString(20)

		// Create password reset token
		const passwordResetToken = new PasswordResetToken({
			user: user._id,
			token: resetToken,
		})
		await passwordResetToken.save()

		// Send reset email
		await sendEmail({
			to: user.email,
			subject: "Password Reset",
			text: `You have requested a password reset. Please use this token: ${resetToken} to reset your password through your application.`,
		})

		res.status(200).json({ message: "Password reset instructions sent" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Something went wrong" })
	}
	return undefined
}

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token, password } = req.body

		// Find password reset token
		const resetToken = await PasswordResetToken.findOne({ token })
		if (!resetToken) {
			return res.status(400).json({ error: "Invalid or expired token" })
		}

		// Find user
		const user = await User.findById(resetToken.user)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Update user password
		user.password = hashedPassword
		await user.save()

		// Delete password reset token
		await PasswordResetToken.deleteOne({ token })

		res.status(200).json({ message: "Password reset successful" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Something went wrong" })
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
