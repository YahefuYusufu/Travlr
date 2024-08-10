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
		select: false, // Exclude password from public responses
	},
	firstname: {
		type: String,
		required: [true, "A user must have a firstName."],
		trim: true,
	},
	lastname: {
		type: String,
		required: [true, "A user must have a lastName."],
		trim: true,
	},
	picture: {
		type: String, // Consider using a cloud storage solution for image storage
	},
	age: {
		type: Number,
		required: true,
		min: 18, // Set a minimum age
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

userSchema.pre("save", async function (next) {
	// Password hashing logic here
	next()
})

const User = mongoose.model("User", userSchema)

export default User
