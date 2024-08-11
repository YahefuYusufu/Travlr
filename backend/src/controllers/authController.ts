import { Request, Response } from "express"
import User from "../models/user"
import Profile from "../models/profile"
import bcrypt from "bcryptjs"

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

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
