import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	startDate: Date,
	endDate: Date,
	locations: [
		{
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
		},
	],
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
})

const Tour = mongoose.model("Tour", tourSchema)

export default Tour
