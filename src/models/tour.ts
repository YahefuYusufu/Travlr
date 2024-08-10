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
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
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
