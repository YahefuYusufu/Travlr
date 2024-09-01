import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "A user must have an email."],
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, "A user must have a password."],
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile",
	},
})

const User = mongoose.model("User", userSchema)

export default User
