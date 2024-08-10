import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	firstName: {
		type: String,
		required: [true, "A user must have a firstName."],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, "A user must have a lastName."],
		trim: true,
	},
	picture: {
		type: String, // Consider using a cloud storage solution for image storage
	},
})

const Profile = mongoose.model("Profile", profileSchema)

export default Profile
