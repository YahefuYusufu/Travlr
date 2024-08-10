import { Request, Response } from "express"
import User from "../models/user"
import bcrypt from "bcryptjs"

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password, firstname, lastname, age } = req.body

		// Basic password hashing (replace with a stronger hashing algorithm)
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			email,
			password: hashedPassword,
			firstname,
			lastname,
			age,
		})

		const savedUser = await user.save()
		res.status(201).json(savedUser)
	} catch (error) {
		const err = error as Error
		res.status(400).json({ error: err.message })
	}
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		// Basic password comparison (replace with bcrypt comparison)
		if (password !== user.password) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		res.json({ message: "Login successful" })
	} catch (error) {
		const err = error as Error
		res.status(500).json({ error: err.message })
	}
	return undefined
}
