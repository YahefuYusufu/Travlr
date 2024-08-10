import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
})

const Location = mongoose.model("Location", locationSchema)

export default Location
