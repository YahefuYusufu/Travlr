import mongoose from "mongoose"

export interface ProfileProps {
	_id: mongoose.Schema.Types.ObjectId
	user: mongoose.Schema.Types.ObjectId
	firstName: string
	lastName: string
	picture?: string
}

// If you have User schema
export interface UserProps {
	_id: mongoose.Schema.Types.ObjectId
	email: string
	password: string
	createdAt: Date
	profile: ProfileProps | null
}
