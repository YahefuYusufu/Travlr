import { NextFunction, Request, Response } from "express"
import User from "../models/user"

import bcrypt from "bcryptjs"
import { DuplicateEmailError } from "../utils/DuplicateEmailError"

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
